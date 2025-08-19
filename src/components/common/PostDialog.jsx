'use client'
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "react-toastify";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function PostDialog({id}) {
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
            id: id, // Assuming you want to associate the post with a user ID
        };

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                router.push(`/posts/${result.post._id}`) // Redirect to the newly created post
                sucessToast()
                setIsOpen(false)

            } else {
                errorToast()

            }

        } catch (error) {
            console.error('Error creating post:', error);
            errorToast();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Post</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={createPostHandler} className="space-y-4">
                    {/* form fields here */}
                    <div>
                        <label htmlFor="title">Title</label>
                        <Input type="text" id="title" name="title" required/>
                    </div>
                    <div>
                        <label htmlFor="image">Image Link (URL must imgbb.com)</label>
                        <Input type="url" id="image" name="image" required/>
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <Textarea id="content" name="content" rows="4" required/>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}