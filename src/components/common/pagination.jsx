export default function Paginator(props) {
    return (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span
                className="font-medium">27</span> posts
            </div>
            <div className="flex gap-2">
                <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <i className="fas fa-chevron-left mr-2"></i> Previous
                </button>
                <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Next <i className="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    )
}