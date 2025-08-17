import React from 'react'
import PostCard from './PostCard'

function PopularBlogs() {
    const posts = [
        {
            image: 'https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg',
            title: 'Exploring the Mountains',
            description: 'A journey through the breathtaking mountain ranges. Experience the thrill of hiking, witness stunning vistas, and immerse yourself in the tranquility of nature. Discover tips for safe travel, must-visit spots, and stories from fellow adventurers.',
            author: 'John Doe',
            date: '2023-10-01',
        },
        {
            image: 'https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg',
            title: 'Culinary Delights',
            description: 'Discovering the best local cuisines. From street food to fine dining, explore unique flavors, traditional recipes, and culinary secrets from around the world. Join us as we savor dishes that tell the story of their culture.',
            author: 'Jane Smith',
            date: '2023-10-02',
        },
        {
            image: 'https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg',
            title: 'Urban Adventures',
            description: 'Exploring the hidden gems of the city. Uncover vibrant neighborhoods, artistic corners, and bustling markets. Get insider tips on where to go, what to see, and how to make the most of your urban explorations.',
            author: 'Alice Johnson',
            date: '2023-10-03',
        }
    ]
    return (
        <section className="py-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                )
                )}
            </div>
        </section>
    )
}

export default PopularBlogs