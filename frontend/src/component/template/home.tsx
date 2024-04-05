import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../atoms/button";
import ImageArea from "../atoms/imageArea";

const StyledImageArea = styled.div`
	margin-bottom: 20px;
`;

const StyledButtonArea = styled.div`
	display: flex;
	justify-content: center;
`;

const HomePage: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			setSelectedFileName(file.name);
			const formData = new FormData();
			formData.append("file", file);

			fetch("http://localhost:5000/upload", {
				method: "POST",
				body: formData,
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					console.log("File uploaded successfully", data);
				})
				.catch((error) => {
					console.error("Error uploading file", error);
				});
		}
	};

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>
			<StyledImageArea>
				<ImageArea
					imageUrl={`${process.env.PUBLIC_URL}/images/${selectedFileName}`}
				/>
			</StyledImageArea>
			<StyledButtonArea>
				<Button name="Load" onClick={handleButtonClick} />
			</StyledButtonArea>
		</>
	);
};

export default HomePage;
