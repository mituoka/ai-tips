import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ListDataProps {
	label: string;
	percentage: number;
}

const ListData: React.FC<ListDataProps> = ({ label, percentage }) => {
	return (
		<Box display="flex" alignItems="center" width="100%">
			<Typography variant="body1" sx={{ minWidth: "100px" }}>
				{label}
			</Typography>
			<Box width="50%" mr={1}>
				<LinearProgress variant="determinate" value={percentage} />
			</Box>
			<Typography variant="body2" color="text.secondary">
				{percentage}%
			</Typography>
		</Box>
	);
};

export default ListData;
