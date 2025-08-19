'use client';
import {useState, useEffect} from "react";
import Profile_post from "@/components/user/profile_post";

export default function AllProfilePosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data.posts);
                setLoading(false);
            } catch (e) {
                console.error('Error fetching posts:', e);
                setError('Failed to load posts.');
                setLoading(false);

            }

        };
        fetchPosts();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    if (loading) {
        return <div className="text-gray-500">Loading posts...</div>;
    }
    if (!posts && !loading) {
        return <div className="text-gray-500">No posts available.</div>;
    }
    return (
        <div className=" w-full">
            {posts.map((post) => (
                <Profile_post key={post._id} post={post}/>
            ))}
        </div>
    );
}