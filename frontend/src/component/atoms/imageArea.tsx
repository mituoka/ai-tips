import React from "react";
import styled from "styled-components";

interface ImageAreaProps {
	imageUrl: string; // 画像のURLをpropsから受け取ります
}

const StyledImageArea = styled.div`
	display: grid;
	place-items: center;
	height: auto;
	margin: 20px;

	img {
		max-width: 80%;
		max-height: 80vh;
		object-fit: contain;
	}
`;

const ImageArea: React.FC<ImageAreaProps> = ({ imageUrl }) => {
	return (
		<StyledImageArea>
			<img src={imageUrl} alt="Provided" />
		</StyledImageArea>
	);
};

export default ImageArea;
