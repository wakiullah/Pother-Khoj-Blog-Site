const {dbConnect} = require('@/lib/db');
import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {userVerify} from "@/utilitis/userVerify";
import Posts from "@/model/Post_Model";


export async function GET(req) {
    await dbConnect();

    const posts = await Posts.find({}).sort({createdAt: -1})

    return NextResponse.json({message: "Post Fetch sucessfll", posts: posts}, {status: 200});
}

export async function POST(req) {
    await dbConnect();
    const authUser = await userVerify()

    const {title, content, image, id} = await req.json();
    const data = {
        title,
        content,
        image,
        createdAt: new Date(),
        author: id,
        likes: 0,

    }

    try {
        const newPost = new Posts(data);
        await newPost.save()
        revalidatePath('/user/posts'); // Revalidate the /user/posts path to update the cache
        return NextResponse.json({
            message: "Post created successfully",
            post: newPost,
            revalidated: true
        }, {status: 201});


    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

