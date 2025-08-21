'use client'
import { MdDelete } from 'react-icons/md';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import PostDialog from '../common/PostDialog';


function Profile_post({ post }) {
    const router = useRouter()
    const first15Words = post.content.split(' ').slice(0, 15).join(' ') + (post.content.split(' ').length > 15 ? '...' : '');
    const successToast = () => toast.success('Post Deleted')
    const errorToast = () => toast.error('Post Delete failed!')

    const postDeleteHandler = async (e) => {
        if (e === 'delete') {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
                    method: 'DELETE',
                    body: JSON.stringify({ id: post._id, author: post.author })
                });

                const data = await response.json();
                if (data.message) {
                    successToast()
                    router.push(`/`)
                } else {
                    errorToast()
                    console.log(data.error)
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div
            className="bg-gradient-to-r w-full from-blue-100 to-purple-100 shadow-lg rounded-xl p-8 mb-6 border border-blue-200">
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-2xl font-bold mb-3 text-blue-800">{post.title}</h2>
                <div className='min-w-5 h-5'>
                    <MdDelete onClick={() => postDeleteHandler('delete')} className="text-red-500 w-full h-auto cursor-pointer" />
                    <PostDialog id={post._id} post={post} method={'PATCH'} />
                </div>
            </div>
            <p className="text-gray-800 mb-4 overflow-hidden">{first15Words}</p>
            <div className='flex justify-between'>
                <Button variant={'outline'}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    <Link href={`/posts/${post._id}`}>Read More</Link>
                </Button>
                <p className="text-gray-500 text-sm mt-2">{post.statue}</p>
            </div>
        </div>
    )
}

export default Profile_post