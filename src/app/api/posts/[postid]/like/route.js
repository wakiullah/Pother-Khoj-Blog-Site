import { NextResponse } from "next/server";
import Posts from '@/model/Post_Model';
import { dbConnect } from "@/lib/db";


export async function GET(req, { params }) {
    await dbConnect()
    const postId = params.postid;

    const post = await Posts.findById(postId).select('likes liked');
    return NextResponse.json({
        likes: post.likes,
        liked: post.liked
    }, { status: 200 });
}

export async function POST(req, { params }) {
    await dbConnect()
    const { userId, isAlreadyLiked } = await req.json();

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const postId = params.postid;
    let update;
    if (isAlreadyLiked) {
        update = {
            $inc: { likes: -1 },
            $pull: { liked: userId + '' }
        };
    } else {
        update = {
            $inc: { likes: 1 },
            $addToSet: { liked: userId }
        };
    }
    console.log(update);

    const updatedPost = await Posts.findByIdAndUpdate(
        postId,
        update,
        { new: true }
    );

    if (!updatedPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({
        message: "Post liked successfully",
        likes: updatedPost.likes,
        liked: updatedPost.liked
    }, { status: 200 });
}

