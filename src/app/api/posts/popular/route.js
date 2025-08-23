import { dbConnect } from "@/lib/db";
import Posts from "@/model/Post_Model";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    const mostLikedPosts = await Posts.find({ statue: 'approved' }).sort({ likes: -1 }).limit(3);
    return NextResponse.json(mostLikedPosts, { status: 200 });
}