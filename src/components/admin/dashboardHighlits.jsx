import { apiRequest } from "@/utils/api"
import Link from "next/link"

export default async function DashboardHighlights() {
    const data = await apiRequest('/dashboard')
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href={'/dashboard/users'}>
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
                    <div className="flex items-center mt-2">
                        <span className="text-2xl font-bold text-blue-600">{data.users}</span>
                        <svg className="w-5 h-5 ml-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
            </Link>

            <Link href={'/dashboard/posts'}>
                <div className="bg-green-100 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-green-800">Total Posts</h3>
                    <div className="flex items-center mt-2">
                        <span className="text-2xl font-bold text-green-600">{data.posts}</span>
                        <svg className="w-5 h-5 ml-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
            </Link>

            <div className="bg-yellow-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-yellow-800">Pending Posts</h3>
                <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-yellow-600">{data.pendingPost}</span>
                    <svg className="w-5 h-5 ml-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-green-800">Approved Posts</h3>
                <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-green-600">{data.approvedPost}</span>
                    <svg className="w-5 h-5 ml-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}