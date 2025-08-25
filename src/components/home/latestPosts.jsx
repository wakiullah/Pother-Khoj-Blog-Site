import React from "react";
import LatestPostCard from "./LatestPostCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Posts from "@/model/Post_Model";
import User from "@/model/User_Model";


const LatestPosts = async () => {
    await dbConnect()
    const dblatestPosts = await Posts.find({ statue: 'approved' }).lean().sort({ createdAt: -1 }).populate('author')

    const parsedData = JSON.parse(JSON.stringify(dblatestPosts))
    console.log(parsedData)
    return (
        <div className="py-8 container  mx-auto" >
            <h2 className="text-2xl font-bold text-center mb-6">Latest Posts</h2>
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 ">
                {parsedData?.map((post) => {
                    return <LatestPostCard key={post._id} post={post} />
                })}
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