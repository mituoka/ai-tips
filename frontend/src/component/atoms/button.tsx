import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
	name: string;
	onClick: () => void;
}

const UsualButton: React.FC<ButtonProps> = ({ name, onClick }) => {
	const content = (
		<div>
			<Button variant="contained" color="primary" onClick={onClick}>
				{name}
			</Button>
		</div>
	);
	return content;
};

export default UsualButton;
