import {Button} from "@/components/ui/button";
import SingleUserList from "@/components/admin/singleUserList";

export default async function UsersList() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const usersData = await response.json();
    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">All Users</h3>
                    <div className="flex space-x-3">

                        <Button variant={'outline'}
                                className=" ">
                            Filters
                        </Button>

                    </div>
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
                        {usersData && usersData.map((user, i) => (
                            <SingleUserList user={user} key={user._id} index={i}/>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}