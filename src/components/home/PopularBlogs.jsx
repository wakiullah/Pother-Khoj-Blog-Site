import React, { Suspense } from 'react'
import PostCard from './PostCard'

async function PopularBlogs() {
    let posts
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        cache: "no-store",

    });
    
    if (res.ok) {
        posts = await res.json();
    } else {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Failed to fetch posts</h1>
            </div>
        )
    }
    return (
        <section className="py-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Posts</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {posts.posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    )
                    )}
                </div>
            </Suspense>
        </section>
    )
}

export default PopularBlogs