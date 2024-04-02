import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
	name: string;
}

const UsualButton: React.FC<ButtonProps> = ({ name }) => {
	const handleClick = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/api/test");
			const data = await response.json();
			console.log(data.message);
			alert(data.message); // レスポンスをアラートで表示
		} catch (error) {
			console.error("API call failed:", error);
			alert("API call failed");
		}
	};

	const content = (
		<div>
			<Button variant="contained" color="primary" onClick={handleClick}>
				{name}
			</Button>
		</div>
	);
	return content;
};

export default UsualButton;
