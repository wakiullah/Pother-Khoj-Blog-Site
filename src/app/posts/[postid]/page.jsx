import Image from "next/image";

export default async function PostDetails({params}) {
    const {postid} = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postid}`);
    if (!response.ok) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            </div>
        );
    }
    const post = await response.json();
    console.log('post', post);
    return (
        <div className={'max-w-5xl mx-auto p-4'}>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                <div className={'max-w-full h-72  relative mb-4'}>
                    <Image className={'object-cover'} src={post.image} alt={post.title} fill={true}/>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <p className="text-gray-500">Author: {post.author}</p>
                <p className="text-gray-500">Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
                <div className={'mt-4'}>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4">
                        Like {post.likes}
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4 ml-2">
                        Unlike
                    </button>
                </div>
            </div>
        </div>
    );
}