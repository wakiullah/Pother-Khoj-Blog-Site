'use client';
import getCurrentUser from "@/utilitis/getCurrentUser";
import { showError } from "@/utils/toast";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export default function LikeButton({ post }) {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null)
    const [liked, setLiked] = useState(post.liked.includes(loggedUser?.id));
    console.log(post)

    useEffect(() => {
        async function fetchData() {
            const user = await getCurrentUser();
            setLoggedUser(user);
            setLiked(post.liked.includes(user?._id));
        }

        fetchData();
    }, [post.liked]);

    async function postLikeHandler() {

        if (loggedUser === null) {
            return showError('Please login to like this post')
        }

        setLikes(likes + (liked ? -1 : 1));
        setIsLiking(true);
        setLiked(prev => !prev);
        try {
            const response = await fetch(`/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: loggedUser._id,
                    isAlreadyLiked: liked
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data)
                // setLiked(data.liked.includes(user?.id));
            } else {
                setLikes(prev => prev - 1);
                setLiked(prev => !prev)
            }
        } catch (e) {
            setLikes(likes);
            setLiked(!liked);
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