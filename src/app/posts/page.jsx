import PostCard from "@/components/home/PostCard";
import { apiRequest } from "@/utils/api";

export default async function Posts() {

    const posts = await apiRequest('/posts/latest')

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