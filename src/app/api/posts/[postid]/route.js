import { NextResponse } from "next/server";
import Posts from "@/model/Post_Model";

export async function GET(req, { params }) {

    const { postid } = await params;

    try {
        const post = await Posts.findOne({ _id: postid }).populate('author')
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function DELETE(req) {
    const pathname = new URL(req.url)
    const id = pathname.pathname.split('/').pop();

    const post = await Posts.findByIdAndDelete(id);
    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    } else {
        return NextResponse.json({ message: "Post deleted successfully", post: post }, { status: 200 });
    }
}
