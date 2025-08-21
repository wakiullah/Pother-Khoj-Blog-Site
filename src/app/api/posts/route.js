const { dbConnect } = require('@/lib/db');
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { userVerify } from "@/utilitis/userVerify";
import Posts from "@/model/Post_Model";


export async function GET(req) {
    await dbConnect();

    const posts = await Posts.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ message: "Post Fetch sucessfll", posts: posts }, { status: 200 });
}

export async function POST(req) {
    await dbConnect();
    const authUser = await userVerify()

    const { title, content, image, id, tags } = await req.json();
    const data = {
        title,
        content,
        image,
        createdAt: new Date(),
        author: id,
        likes: 0,
        tags

    }

    try {
        const newPost = new Posts(data);
        await newPost.save()
        revalidatePath('/user/posts'); // Revalidate the /user/posts path to update the cache
        return NextResponse.json({
            message: "Post created successfully",
            post: newPost,
            revalidated: true
        }, { status: 201 });


    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    await dbConnect();
    const authUser = await userVerify()

    if (!authUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { title, content, image, id, statue } = await req.json();

    try {
        const updateData = {};
        if (title) {
            updateData.title = title;
        }
        if (content) {
            updateData.content = content;
        }
        if (image) {
            updateData.image = image;
        }
        if (statue) {
            updateData.statue = statue;
        }

        const updatedPost = await Posts.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Post updated successfully",
            post: updatedPost,
            revalidated: true
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    const authUser = await userVerify()
    const { id, author } = await req.json();

    if (!authUser || authUser.id !== author) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const deletedPost = await Posts.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Post deleted successfully",
            post: deletedPost,
            revalidated: true
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}