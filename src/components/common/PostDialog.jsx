'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";
import { showSuccess } from "@/utils/toast";

export default function PostDialog({ id, post = {}, method = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const errorToast = () => toast.error("Error! Something went wrong!");
    const sucessToast = () => toast.success("post created successfully!");

    const createPostHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            title: formData.get('title'),
            image: formData.get('image'),
            content: formData.get('content'),
            tags: formData.get('tag'),
            id: id,
        };

        try {

            if (method === "PATCH") {
                const res = await apiRequest('/posts', method, data)
                if (res.message) {
                    showSuccess("Post Updated")
                    router.push(`/posts/${res.post._id}`)
                }
            } else {
                const postdata = await apiRequest('/posts', "POST", data)
                if (postdata.message) {
                    sucessToast()
                    router.push(`/posts/${postdata.post._id}`)
                }
            }

        } catch (error) {
            console.error('Error creating post:', error);
            errorToast();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} className="overflow-scroll max-w-3/4">
            <DialogTrigger asChild>
                {method === 'PATCH' ? <CiEdit className="text-blue-500 w-full h-auto cursor-pointer mt-1" /> : <Button variant="outline">Create Post</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={createPostHandler} className="space-y-4">
                    {/* form fields here */}
                    <div>
                        <label htmlFor="title">Title</label>
                        <Input defaultValue={post?.title} type="text" id="title" name="title" required />
                    </div>
                    <div>
                        <label htmlFor="image">Image Link (URL must imgbb.com html view)</label>
                        <Input defaultValue={post?.image} type="url" id="image" name="image" required />
                    </div>
                    <div>
                        <label htmlFor="tag">Tag (only one word)</label>
                        <Input defaultValue={post?.tags} type="text" id="tag" name="tag" />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <Textarea defaultValue={post?.content} id="content" name="content" rows="4" required className={'max-h-32'} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">{method === 'PATCH' ? "Update Post" : "Create Post"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}