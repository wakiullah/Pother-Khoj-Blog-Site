import Posts from "@/model/Post_Model";
import { NextResponse } from 'next/server';

export async function GET(req) {

    const random5posts = await Posts.aggregate([
        { $match: { statue: "approved" } },
        { $sample: { size: 5 } }
    ]);

    return NextResponse.json(random5posts, { status: 200 });

}