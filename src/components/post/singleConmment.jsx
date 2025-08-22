export default function SingleComment({ comment, commentor, date }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
                <div className="font-semibold">John Doe</div>
                <div className="text-gray-500 text-sm ml-2">2 days ago</div>
            </div>
            <p className="text-gray-700">Great post! Really enjoyed reading this content. Looking forward to more posts like this.</p>
        </div>
    )
}