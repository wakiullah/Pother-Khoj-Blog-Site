'use client';
import { useState } from "react";
import getCurrentUser from "@/utilitis/getCurrentUser";

export default function LikeButton({ post }) {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [liked, setLiked] = useState(post.liked.includes(post.author));
    console.log(liked, post.liked, post.author, post.likes);

    async function postLikeHandler() {
        setIsLiking(true);
        const currentUser = await getCurrentUser();
        setLikes(likes + (liked ? -1 : 1)); // Optimistically update likes count
        setLiked(!liked); // Toggle liked state

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: post.author, isAlreadyLiked: liked }), // Pass actual userId
            });
            const data = await response.json();
            if (response.ok) {
                setLikes(data.likes); // Update with server value
            } else {
                setLikes(likes); // Revert on error
            }
        } catch (e) {
            setLikes(likes); // Revert on error
            setLiked(!liked); // Revert liked state
        } finally {
            setIsLiking(false);
        }
    }

    return (
        <button
            onClick={postLikeHandler}
            disabled={isLiking}
            className={`${liked ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} hover:cursor-pointer text-white px-4 py-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4`}>
            {liked ? 'Liked by you' : 'like'} ({likes})
        </button>
    );
}