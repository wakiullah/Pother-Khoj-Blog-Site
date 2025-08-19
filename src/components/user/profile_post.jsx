import {DropdownMenu} from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import {Button} from '../ui/button';

function Profile_post({post}) {
    const first15Words = post.content.split(' ').slice(0, 15).join(' ') + (post.content.split(' ').length > 15 ? '...' : '');
    return (
        <div
            className="bg-gradient-to-r w-full from-blue-100 to-purple-100 shadow-lg rounded-xl p-8 mb-6 border border-blue-200">
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-2xl font-bold mb-3 text-blue-800">{post.title}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="text-blue-600 hover:bg-blue-50 p-2">
                            {/* Bold colon SVG icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <circle cx="8" cy="12" r="2.2"/>
                                <circle cx="16" cy="12" r="2.2"/>
                            </svg>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-4">
                        <DropdownMenuRadioGroup value={'top'}>
                            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="text-gray-800 mb-4">{first15Words}</p>
            <Button variant={'outline'}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Read More
            </Button>
        </div>
    )
}

export default Profile_post