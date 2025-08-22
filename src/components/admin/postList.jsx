import PostCard from "@/components/home/PostCard";
import AdminPostCard from "@/components/admin/adminPostCard";

export default async function PostsList() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const postsData = await response.json();

    return (<div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Posts Management</h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full">
                        <input
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Search posts..."
                            type="text"/>
                        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                    </div>
                
                </div>
            </div>
            <div className="space-y-4">
                {postsData && postsData.posts.map((post) => (
                    <AdminPostCard post={post} key={post._id}/>
                ))}

            </div>
        </div>

    )
}