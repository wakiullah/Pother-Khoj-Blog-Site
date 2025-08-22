import Image from "next/image";
import LikeButton from "@/components/post/likeButton";
import SingleConmment from "@/components/post/singleConmment";

export default async function PostDetails({ params }) {
    const { postid } = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postid}`);
    if (!response.ok) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            </div>
        );
    }
    const post = await response.json();
    return (
        <div className={'max-w-5xl mx-auto p-4 '}>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4 overflow-clip">
                <div className={'max-w-full h-72  relative mb-4'}>
                    <Image className={'object-cover'} src={post.image} alt={post.title} fill={true} />
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <p className="text-gray-500">Author: {post.author.name}</p>
                <p className="text-gray-500">Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
                <div className={'mt-4'}>
                    <LikeButton post={post} />
                </div>
            </div>
            {/* //add a comment box section for new comment and with 2 comment by a user */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>

                {/* New comment form */}
                <form className="mb-6">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Write a comment..."
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Post Comment
                    </button>
                </form>

                <div className="space-y-4">
                    {post.comments.length > 0 && post.comments.map((comment) => (
                        <SingleConmment />
                    ))}
                </div>
            </div>
        </div>
    );
}