import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
	name: string;
}

const UsualButton: React.FC<ButtonProps> = ({ name }) => {
	const content = (
		<div>
			<Button variant="contained" color="primary">
				{name}
			</Button>
		</div>
	);
	return content;
};

export default UsualButton;
