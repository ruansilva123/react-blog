import { useState, useEffect } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';
import { db } from '../firebase/config';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false); // cleanup - deal with memory leak

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {displayName: data.displayName});

            setLoading(false);

            return user;
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "Password must be more than 6 characters!";
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "Email is already registered!";
            }else {
                systemErrorMessage = "One error was ocurred. Try again later!";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    // singOut
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    // login - sign in
    const login = async(data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            console.log(error);
            let systemErrorMessage;

            if (error.message.includes("invalid-credential")) {
                systemErrorMessage = "User not found or incorrect credentials!";
            } else {
                systemErrorMessage = "One error was ocurred. Try again later!"
            }

            setError(systemErrorMessage);
        }

        setLoading(false);
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
}