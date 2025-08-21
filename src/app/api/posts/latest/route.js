import Posts from "@/model/Post_Model";
import { NextResponse } from "next/server";

export async function GET(req) {
    const latestPosts = await Posts.find({ statue: 'approved' }).sort({ createdAt: -1 })

    return NextResponse.json(latestPosts, { status: 200 })
}