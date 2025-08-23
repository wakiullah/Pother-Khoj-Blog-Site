import { dbConnect } from "@/lib/db";
import Posts from "@/model/Post_Model";
import { userVerify } from "@/utilitis/userVerify";
import { NextResponse } from "next/server";

export async function GET(request) {

    await dbConnect()
    const userData = await userVerify()
    if (!userData) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const userPosts = await Posts.find({ author: userData.id });

        if (!userPosts) {
            return NextResponse.json({ error: "No posts found" }, { status: 404 });
        }
        return NextResponse.json({ posts: userPosts }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}