import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../atoms/button";
import ImageArea from "../atoms/imageArea";

const StyledButtonArea = styled.div`
	display: flex;
	justify-content: center;
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
			await getImageData(file.name);
		}
	};

	const uploadImageFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/api/upload_image",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("File uploaded successfully", response.data);
		} catch (error) {
			console.error("Error uploading file", error);
		}
	};

	const getImageData = async (fileName: string) => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:5000/api/download_image?filename=${encodeURIComponent(
					fileName
				)}`,
				{
					responseType: "blob",
				}
			);
			const url = URL.createObjectURL(new Blob([response.data]));
			setImageURL(url);
			console.log("File download successfully", response.data);
		} catch (error) {
			console.error("Error download file", error);
		}
	};

	return (
		<>
			<div>
				<ImageArea imageUrl={imageURL} />
			</div>
			<StyledButtonArea>
				<Button name="Upload" onClick={() => fileInputRef.current?.click()} />
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={handleFileChange}
				/>
			</StyledButtonArea>
		</>
	);
};

export default HomePage;
