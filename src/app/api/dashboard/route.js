import { dbConnect } from "@/lib/db";
import Posts from "@/model/Post_Model";
import User from "@/model/User_Model";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect()

    const posts = await Posts.estimatedDocumentCount()
    const pendingPost = await Posts.countDocuments({ statue: 'pending' })
    const approvedPost = await Posts.countDocuments({ statue: 'approved' })
    const users = await User.estimatedDocumentCount()

    return NextResponse.json({ posts, pendingPost, approvedPost, users }, { status: 200 })
}
