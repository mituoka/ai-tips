import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import HomePage from "./components/pages/home";
import PrivateRoute from "./components/template/hooks/privateRoute";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Login />} />
				<Route
					path="/home"
					element={
						<PrivateRoute>
							<HomePage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
