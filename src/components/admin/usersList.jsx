import { Button } from "@/components/ui/button";
import SingleUserList from "@/components/admin/singleUserList";
import { apiRequest } from "@/utils/api";
import User from "@/model/User_Model";
import { dbConnect } from "@/lib/db";

export default async function UsersList() {
    await dbConnect()
    const users = await User.find({}).lean();
    const serializedUsers = JSON.parse(JSON.stringify(users));

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">All Users</h3>

                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {serializedUsers.map((user, i) => (
                                <SingleUserList user={user} key={user._id} index={i} />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}