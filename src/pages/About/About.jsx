import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>About the React <span>Blog</span></h2>
            <p>This project was build with React.js in frontend and Firebase in backend.</p>
            <Link to="/posts/create" className="btn">
                Make a post
            </Link>
        </div>
    )
}

export default About