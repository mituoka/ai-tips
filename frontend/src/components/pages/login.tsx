import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
	username: string;
	password: string;
}

const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const navigate = useNavigate(); // useNavigate フックを使用
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージの状態

	const onSubmit = async (data: FormData) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/api/login",
				data
			);
			if (response.status !== 200) {
				setErrorMessage(
					"Login failed. Please check your username and password."
				);
				return;
			}

			if (response.data.authenticated) {
				navigate("/home");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// AxiosError からステータスコードを取得
				const status = error.response?.status;
				if (status === 400) {
					setErrorMessage("Incorrect username and password.");
				} else {
					setErrorMessage(
						`Login request failed with status code: ${status}. Please try again later.`
					);
				}
				console.error("Login failed:", error.message);
			} else {
				// 非Axiosエラーの処理
				console.error("An unexpected error occurred:", error);
				setErrorMessage(
					"An unexpected error occurred. Please try again later."
				);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Username:</label>
				<input {...register("username", { required: true })} />
				{errors.username && <p>This field is required</p>}
			</div>
			<div>
				<label>Password:</label>
				<input type="password" {...register("password", { required: true })} />
				{errors.password && <p>This field is required</p>}
			</div>
			{errorMessage && <div>{errorMessage}</div>}
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
