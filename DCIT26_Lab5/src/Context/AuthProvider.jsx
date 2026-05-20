import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([
        {
            username: "Lime",
            email: "admin@example.com",
            password: "L!me$eren1ty",
            name: "Admin User"
        }
    ]);

    const handleSignUp = (userData) => {
        const userExists = registeredUsers.some(u => u.email === userData.email);

        if (userExists) {
            alert("Email is already registered!");
            return false;
        }

        setRegisteredUsers(prev => [...prev, userData]);
        alert("Registration Successful! You can now Sign In.");
        return true;
    };

    const handleSignIn = (username, password) => {
        const foundUser = registeredUsers.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            return true;
        } else {
            return false;
        }
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleSignIn, handleSignUp, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
