import React, { useContext } from 'react';
import { json, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
  import { toast } from 'react-toastify';
	import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
	const { createUser, updateUserProfile, user, setLoading } =
		useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || "/";
	if (user?.email) {
		return navigate(from, { replace: true });
	}
		const saveUser = (name, email) => {
			const user = { name, email };
			fetch(`https://doc-service-server.vercel.app/users`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(user)
			})
				.then((res) => res.json())
				.then((data) => {});
		};
	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const photoURL = form.photoURL.value;
		const password = form.password.value;
		createUser(email, password)
			.then((result) => {
				const user = result.user;
				
				saveUser(user?.displayName, user?.email)
                form.reset();
                handleUpdateUserProfile(name, photoURL);
				toast.success('Successfully Sign up')
			})
			.catch((err) => {
				alert(err)
			});

        const handleUpdateUserProfile = (name, photoURL) => {
					const profile = {
						displayName: name,
						photoURL: photoURL,
					};
					updateUserProfile(profile)
						.then(() => {})
						.catch((err) => {
							alert(err);
						});
				};
            
	};
	return (
		<div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 w-3/4 mx-auto my-20">
			<form className="space-y-6" onSubmit={handleSignUp}>
				<h5 className="text-xl font-medium text-gray-900 dark:text-white">
					Sign in to our platform
				</h5>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Your name
					</label>
					<input
						type="name"
						name="name"
						id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="elon mask"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Photo URL
					</label>
					<input
						type="photoURL"
						name="photoURL"
						id="photoURL"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="Photo URL"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Your email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="name@company.com"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Your password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Login to your account
				</button>

				<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
					Already registered?{' '}
					<Link
						to="/login"
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						sign in now!
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
