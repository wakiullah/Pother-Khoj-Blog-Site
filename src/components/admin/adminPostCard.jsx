'use client'
import { Button } from "@/components/ui/button";
import { getDate } from "@/utilitis/getDate";
import Image from "next/image";
import { sliceContent } from "@/utilitis/sliceContent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { showSuccess, showError } from "@/utils/toast";

export default function AdminPostCard({ post }) {
    const { date } = getDate(post.createdAt)
    const slicedContent = sliceContent(post.content, 15);
    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    const postAppreveHandler = async () => {
        setClicked(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: post._id,
                statue: post.statue === "approved" ? 'pending' : 'approved'
            }),
        }
        );
        if (response.ok) {
            const data = await response.json();
            router.refresh()
            setClicked(false);
        } else {
            console.error("Failed to approve post");
            setClicked(false);
        }
    }
    const onDelete = async () => {
        const deleteData = await apiRequest(`/posts/${post._id}`, 'DELETE')
        if (deleteData.message) {
            showSuccess('Post Deleted!')
            router.refresh()
        } else {
            showError('Post delete faild!')
        }
    }

    return (
        <div
            className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 transition-all hover:shadow-md">
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 max-w-52 overflow-hidden  sm:w-40 h-40">
                        <Image
                            alt={post?.title || "Post image"}
                            className=" max-w-full  object-cover rounded-md"
                            src={post?.image || "https://placehold.co/300x200"}
                            width={500}
                            height={300}
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div className="overflow-hidden">
                                <h3 className="text-lg font-semibold text-gray-800">{post?.title || "Untitled Post"}</h3>
                                <p className="text-sm text-gray-500 mt-1">{post?.author || "Unknown Author"} • {date || "Unknown date"}</p>
                            </div>
                            <span
                                className={`${post.statue === 'pending' ? 'bg-yellow-300' : 'bg-green-300'} inline-flex items-center px-3 py-1 rounded-full text-xs font-medium min-w-10`}>
                                {post.statue}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-2">{slicedContent || "No description available."}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post?.tags?.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="flex justify-end mt-4 space-x-3">
                    <Button className='cursor-pointer' disabled={clicked} onClick={postAppreveHandler}
                        variant={'outline'}>Make {post.statue === "Approved" ? 'Pending' : 'Approved'}</Button>
                    <Button className='cursor-pointer' onClick={() => onDelete(post._id)} variant={'destructive'}>Delete</Button>
                </div>
            </div>
        </div>
    )
}