import React from 'react';
import EditProfileModal from './editProfileModal';
import { Button } from '../ui/button';
import Profile_post from './profile_post';

const Profile = () => {
    return (
        <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center font-sans border border-gray-200">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-md mb-4">
                <img
                    src="https://i.pravatar.cc/120"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Jane Doe</h2>
            <p className="text-gray-500 text-base mb-4">UI/UX Designer</p>
            <EditProfileModal name="wakiullah" email="m.wakiullah@gamail.com" />
            <div className="flex w-full justify-around mb-6">
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-blue-600">120</span>
                    <span className="text-xs text-gray-400">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-blue-600">350</span>
                    <span className="text-xs text-gray-400">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-blue-600">180</span>
                    <span className="text-xs text-gray-400">Following</span>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Posts</h3>
                <Profile_post title="My First Post" content="This is a brief description of my first post. It contains some interesting insights and thoughts." />
                <Profile_post title="Another Day, Another Post" content="Here's another post where I share my experiences and learnings from the day." />
            </div>
        </div>
    );
};

export default Profile;