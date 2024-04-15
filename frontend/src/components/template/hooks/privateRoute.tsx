import React from "react";
import { Navigate } from "react-router-dom";

// 認証状態を管理するためのコンテキストやReduxなどの状態をここにインポート
// 例: import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const isAuthenticated = true; // 実際には認証状態を動的にチェック

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default PrivateRoute;
