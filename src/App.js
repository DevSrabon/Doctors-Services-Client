import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routes/Routes';
import 'react-photo-view/dist/react-photo-view.css';
import { ToastContainer } from 'react-toastify';
import ScrollToApp from './components/ScrollToApp/ScrollToApp';
function App() {
	return (
		<div className="">
			<RouterProvider router={router}></RouterProvider>
			<ScrollToApp/>
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}

export default App;
