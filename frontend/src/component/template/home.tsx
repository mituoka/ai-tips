import React from "react";
import Button from "../atoms/button";
import ImageArea from "../atoms/imageArea";

const HomePage: React.FC = () => {
	const content = (
		<>
			<div className="ImageArea">
				<ImageArea imageUrl={`${process.env.PUBLIC_URL}/images/test2.jpg`} />
			</div>
			<div className="ButtonArea">
				<Button name="ボタン2" />
			</div>
		</>
	);
	return content;
};

export default HomePage;
