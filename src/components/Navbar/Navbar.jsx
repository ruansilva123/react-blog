import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink to="/">
                React <span>Blog</span>
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navbar