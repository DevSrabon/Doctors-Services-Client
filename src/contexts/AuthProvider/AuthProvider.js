import React from 'react';
import { createContext } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();
	
	const providerLogin = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signInWithGoogle = () => {
		return signInWithPopup(auth, googleProvider);
	};

	const updateUserProfile = (profile) => {
		return updateProfile(auth.currentUser, profile);
	};

	const logOut = () => {
		localStorage.removeItem('genius-token');
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		setLoading,
		createUser,
		login,
		logOut,
		updateUserProfile,
		signInWithGoogle,
		providerLogin
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
