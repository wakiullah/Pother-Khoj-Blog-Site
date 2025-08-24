import PostCard from "@/components/home/PostCard";
import { dbConnect } from "@/lib/db";
import Posts from "@/model/Post_Model";
import User from "@/model/User_Model";


export default async function PostsPage() {

    await dbConnect();
    const posts = await Posts.find({ statue: 'approved' })
        .lean()
        .populate('author')
        .sort({ createdAt: -1 })

    // Convert MongoDB objects to plain objects
    const serializedPosts = JSON.parse(JSON.stringify(posts));
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}