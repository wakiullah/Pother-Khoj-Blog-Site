import React, { Suspense } from 'react'
import PostCard from './PostCard'
import { dbConnect } from '@/lib/db';
import Posts from '@/model/Post_Model';

async function PopularBlogs() {
    await dbConnect()
    const mostLikedPosts = await Posts.find({ statue: 'approved' }).sort({ likes: -1 }).limit(3);
    const parsePosts = JSON.parse(JSON.stringify(mostLikedPosts));
    return (
        <section className="py-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Posts</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {parsePosts?.map((post, index) => (
                        <PostCard key={index} post={post} />
                    )
                    )}
                </div>
            </Suspense>
        </section>
    )
}

export default PopularBlogs