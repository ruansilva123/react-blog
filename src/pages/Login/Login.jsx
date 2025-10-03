// libs
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

// styles
import styles from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const user = {
            email,
            password
        };

        const res = await login(user);
    }

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <p>Enter to share your stories</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="User email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Login</button>}
                {loading && <button className="btn" disabled>Wait...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Login