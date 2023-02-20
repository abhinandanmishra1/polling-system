import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import Some from "./components/Some";
import StudentWelcomePage from "./components/StudentName";
import Poll from "./components/Poll";
import CreatePoll from "./components/CreatePoll";
import ViewPoll from "./components/ViewPoll";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

export default function App() {
	console.log(store);
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

			<div className="w-full h-screen bg-[#162f43] text-white grid place-items-center">
				<Provider store={store}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/books" element={<Some />} />
						<Route path="/student">
							<Route index element={<StudentWelcomePage />} />
							<Route path="view-poll" element={<ViewPoll />} />
						</Route>
						<Route path="/teacher" element={<CreatePoll />} />
					</Routes>
				</Provider>
			</div>
		</>
	);
}
