'use client';
import Profile from "@/components/user/profile";
import Profile_post from "@/components/user/profile_post";
import React, { useEffect, useState } from "react";

// Mock API functions (replace with real API calls)
const fetchUserProfile = async () => {
    // Example user data
    return {
        name: "John Doe",
        email: "john.doe@example.com",
    };
};

const fetchUserPosts = async () => {
    // Example posts data
    return [
        { id: 1, title: "First Post", content: "This is my first post." },
        { id: 2, title: "Another Post", content: "Here's another post!" },
    ];
};

export default function UserProfilePage() {
    const [user, setUser] = useState(null); // <-- FIXED
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadData() {
            const userData = await fetchUserProfile();
            const userPosts = await fetchUserPosts();
            setUser(userData);
            setPosts(userPosts);
        }
        loadData();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <Profile />


    );
}