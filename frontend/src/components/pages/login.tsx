import React from "react";
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

	const onSubmit = async (data: FormData) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/api/login",
				data
			);
			if (response.data.authenticated) {
				navigate("/home"); // ログイン成功後に/homeにナビゲート
			}
		} catch (error) {
			console.error("Login failed:", error);
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
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
