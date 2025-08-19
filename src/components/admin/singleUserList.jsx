import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SingleUserList({user, index}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">


                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full `}>
                            {user.role}
                        </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Select>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Change Role"/>
                    </SelectTrigger>
                    <SelectContent>
                        {user.role !== 'admin' ? <SelectItem value="light">Make Admin</SelectItem> :
                            <SelectItem value="light">Make User</SelectItem>}
                    </SelectContent>
                </Select>
            </td>

        </tr>
    )
}
