import React from "react";

interface ImageAreaProps {
	imageUrl: string; // 画像のURLをpropsから受け取ります
}

const ImageArea: React.FC<ImageAreaProps> = ({ imageUrl }) => {
	return (
		<div>
			<img src={imageUrl} alt="Provided" />
		</div>
	);
};

export default ImageArea;
