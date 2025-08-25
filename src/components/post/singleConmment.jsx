import { getDate } from "@/utilitis/getDate"

export default function SingleComment({ comment }) {

    const { date } = getDate(comment.createdAt)
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
                <div className="font-semibold">{comment.user.name}</div>
                <div className="text-gray-500 text-sm ml-2">{date}</div>
            </div>
            <p className="text-gray-700">{comment.content}</p>
        </div>
    )
}