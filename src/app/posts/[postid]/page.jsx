import Image from "next/image";
import LikeButton from "@/components/post/likeButton";
import SingleConmment from "@/components/post/singleConmment";
import CommentForm from "@/components/post/commentForm";
import { dbConnect } from "@/lib/db";
import Posts from "@/model/Post_Model";
import User from "@/model/User_Model";

export default async function PostDetails({ params }) {
    const { postid } = await params;
    await dbConnect()
    const mainpost = await Posts.findOne({ _id: postid }).populate('author').lean()
    const post = JSON.parse(JSON.stringify(mainpost));
    console.log(post);
    if (!post?._id) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            </div>
        );
    }
    return (
        <div className={'max-w-5xl mx-auto p-4 '}>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4 overflow-clip">
                <div className={'max-w-full h-72  relative mb-4'}>
                    <Image className={'object-cover'} src={post.image} alt={post.title} fill={true} />
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <p className="text-gray-500">Author: {post.author ? post.author.name : 'Unknown'}</p>
                <p className="text-gray-500">Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
                <div className={'mt-4'}>
                    <LikeButton post={post} />
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>

                <CommentForm postId={postid} />

                <div className="space-y-4">
                    {post?.comments?.map((comment) => (
                        <SingleConmment />
                    ))}
                </div>
            </div>
        </div>
    );
}