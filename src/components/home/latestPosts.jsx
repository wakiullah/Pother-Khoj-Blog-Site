import React from "react";
import LatestPostCard from "./LatestPostCard";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/utils/api";
import Link from "next/link";


const LatestPosts = async () => {

    const latestpost = await apiRequest('/posts/latest')

    return (
        <div className="py-8" >
            <h2 className="text-2xl font-bold text-center mb-6">Latest Posts</h2>
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 ">
                {latestpost.map((post) => (
                    <LatestPostCard key={post._id} {...post} />
                ))}
            </div>
            <div className={'text-center mt-8'}>
                <Button variant={'outline'}>
                    <Link href="/posts">See More Posts</Link>
                </Button>
            </div>
        </div >
    )
};

export default LatestPosts;