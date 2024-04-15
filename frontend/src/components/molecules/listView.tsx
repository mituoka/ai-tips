import React from "react";
import ReactDOM from "react-dom";
import ListData from "../atoms/listData"; // コンポーネントのインポート
import styled from "styled-components";

const StyledListView = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 10px;
`;

const ListView: React.FC = () => {
	return (
		<StyledListView>
			<ListData label="木材" percentage={30} />
			<ListData label="生態" percentage={30} />
			<ListData label="水草" percentage={30} />
			<ListData label="木材" percentage={30} />
		</StyledListView>
	);
};

export default ListView;
