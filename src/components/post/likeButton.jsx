'use client';
import { set } from "mongoose";
import { useState } from "react";

export default function LikeButton({ post }) {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [liked, setLiked] = useState(post.liked.includes(post.author._id));

    async function postLikeHandler() {
        setIsLiking(true);
        setLikes(likes + (liked ? -1 : 1));
        console.log('like', liked)
        try {
            const response = await fetch(`/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: post.author._id, isAlreadyLiked: liked })
            });
            const data = await response.json();
            if (response.ok) {
                setLiked(prev => !prev)
                setLikes(data.likes);
            } else {
                setLikes(likes); // Revert on error
                console.log('error')
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