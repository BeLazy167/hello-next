import styles from "./style.module.scss";
import { useState } from "react";
import jwt from "jsonwebtoken";
export default function Page1() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("You are not logged in");
    const handleSubmit = async () => {
        const token = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((res) => res.json());
        console.log(token);
        if (token) {
            const json = jwt.decode(token.token) as { [key: string]: string };
            setMessage(`You are logged in as ${json.username}`);
            console.log(json);
        }
    };

    return (
        //basic html form with input usename and password and button
        <div className={styles.container}>
            <h1> {message}</h1>
            <form>
                <label>Username</label>

                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}
