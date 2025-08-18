import React from 'react'
import {Card, CardContent, CardFooter, CardHeader} from '../ui/card'
import Image from 'next/image'
import Link from 'next/link';

function PostCard({post}) {
    const {image, title, content, author, date} = post;
    const firse10words = content.split(' ').slice(0, 15).join(' ') + '...';
    return (
        <Card className='pt-0'>
            <CardHeader className="w-full h-56 relative">
                <Image src={image} alt={title} fill className='object-cover rounded-t-lg'/>
            </CardHeader>
            <CardContent>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p>By {author}/ {date}</p>
                <p className="text-sm text-gray-600">{firse10words}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/posts/${post._id}`} className="text-blue-500 hover:underline">Read More</Link>
            </CardFooter>
        </Card>

    )
}

export default PostCard