'use client'

import { apiRequest } from "@/utils/api"
import { showSuccess } from "@/utils/toast"
import { useFormStatus } from "react-dom"

export default function CommentForm({ postId }) {
    const { pending } = useFormStatus()

    const postCommentHander = async (formData) => {
        const loggedUser = await apiRequest('/users/loggeduser')
        const comment = formData.get('comment');

        const data = {
            user: loggedUser._id,
            content: comment,
            post: postId,
        }
        const res = await apiRequest(`/posts/${postId}/comment`, 'POST', data)
        if (res.message) {
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
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Post Comment
            </button>
        </form>
    )
}