'use client'

import getCurrentUser from "@/utilitis/getCurrentUser"
import { apiRequest } from "@/utils/api"
import { showError, showSuccess } from "@/utils/toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

export default function CommentForm({ postId }) {
    const { pending } = useFormStatus()
    const [loggeduser, setLoggeduser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const user = await getCurrentUser();
            setLoggeduser(user);
        }

        fetchData();
    }, []);

    const postCommentHander = async (formData) => {
        if (loggeduser === null) {
            return showError('Please login to comment this post')
        }
        const comment = formData.get('comment')

        const currentUser = await getCurrentUser()

        const data = {
            user: currentUser._id,
            content: comment,
            post: postId,
        }
        const res = await apiRequest(`/posts/${postId}/comment`, 'POST', data)
        if (res.message) {
            router.refresh()
            showSuccess('Submit!')
        }


    }
    return (
        <form action={postCommentHander} className="mb-6">
            <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Write a comment..."
                name="comment"
            />
            <button
                type="submit"
                disabled={pending}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Post Comment
            </button>
        </form>
    )
}