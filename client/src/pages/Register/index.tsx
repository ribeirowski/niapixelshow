import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            alert("User registered successfully");
        } catch (error) {
            console.error("Error registering user:", error.message);
            alert("Could not register user");
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
