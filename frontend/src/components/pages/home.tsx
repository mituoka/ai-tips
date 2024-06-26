import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../atoms/button";
import ImageArea from "../atoms/imageArea";
import ListView from "../molecules/listView";

const StyledButtonArea = styled.div`
	display: flex;
	justify-content: center;
	margin: 10px 0;
	gap: 20px; /* ボタン同士の間に20pxのギャップを追加 */
`;

const StyledListViewArea = styled.div`
	width: 50%;
	margin: 20px auto;
`;

const HomePage: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageURL, setImageURL] = useState(
		`${process.env.PUBLIC_URL}/images/no_image.png`
	);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			setImageURL(URL.createObjectURL(file));
			await uploadImageFile(file);
		}
	};

	const uploadImageFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		try {
			// axios.postをawaitで待ち、レスポンスを直接変数に格納
			const response = await axios.post(
				"http://127.0.0.1:5000/api/upload_image",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("Average Color:", response.data.average_color);
		} catch (error) {
			console.error("Error uploading file", error);
		}
	};

	return (
		<>
			<div>
				<ImageArea imageUrl={imageURL} />
			</div>
			<StyledButtonArea>
				<Button name="Upload" onClick={() => fileInputRef.current?.click()} />
				<Button name="Analysis" onClick={() => fileInputRef.current?.click()} />
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={handleFileChange}
				/>
			</StyledButtonArea>
			<StyledListViewArea>
				<ListView />
			</StyledListViewArea>
		</>
	);
};

export default HomePage;
