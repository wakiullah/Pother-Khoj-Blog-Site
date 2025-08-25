import { dbConnect } from "@/lib/db";
import Comment from "@/model/comment_Model";
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    const { user, content, post } = await req.json();
    try {
        const newComment = new Comment({
            user,
            content,
            post
        });
        await newComment.save();
        return NextResponse.json({ message: "Comment created successfully", comment: newComment }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}

export async function GET(req, { params }) {
    await dbConnect();
    const postId = await params.postid;
    try {
        const comments = await Comment.find({ post: postId })
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}