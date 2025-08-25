import EditProfileModal from './editProfileModal';
import PostDialog from "@/components/common/PostDialog";
import AllProfilePosts from "@/components/common/AllProfilePosts";
import { dbConnect } from '@/lib/db';
import User from '@/model/User_Model';
import Posts from '@/model/Post_Model';

export default async function Profile({ userDetail }) {
    await dbConnect()
    const user = await User.findById(userDetail.id).lean();
    const postsCount = await Posts.countDocuments({ author: userDetail.id })
    const objectdata = JSON.parse(JSON.stringify(user))

    return (
        <div
            className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center font-sans border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h2>
            <p className="text-gray-500 text-base mb-4">{user?.email}</p>
            <EditProfileModal name={user?.name} email={user?.email} id={objectdata?._id} />
            <div className="flex w-full justify-around mb-6 mt-6">
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-blue-600">{postsCount}</span>
                    <span className="text-xs text-gray-400">Posts</span>
                </div>

            </div>

            <div className="w-full ">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">All Posts</h3>
                    <PostDialog id={objectdata._id} />
                </div>
                <AllProfilePosts />
            </div>
        </div>
    );
};

