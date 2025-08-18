import PostCard from "@/components/home/PostCard";

export default async function Posts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    const postsData = await res.json();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {postsData.posts.map((post) => (
                    <PostCard key={post._id} post={post}/>
                ))}
            </div>
        </div>
    );
}