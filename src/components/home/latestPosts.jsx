import React from "react";
import LatestPostCard from "./LatestPostCard";
import {Button} from "@/components/ui/button";

// Example data, replace with your actual data source or props
const posts = [
    {
        id: 1,
        title: "Understanding React Hooks",
        excerpt: "A quick guide to using hooks in your React projects.",
        image: "https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg",
        date: "2024-06-01",
    },
    {
        id: 2,
        title: "JavaScript ES2024 Features",
        excerpt: "What's new in the latest version of JavaScript.",
        image: "https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg",
        date: "2024-05-28",
    },
    {
        id: 3,
        title: "Styling in React: Best Practices",
        excerpt: "How to style your React apps efficiently.",
        image: "https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg",
        date: "2024-05-20",
    },
];

const LatestPosts = () => (
    <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Latest Posts</h2>
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 ">
            {posts.map((post) => (
                <LatestPostCard key={post.id} {...post} />
            ))}
        </div>
        <div className={'text-center mt-8' }>
        <Button variant={'outline'}>See more</Button>
        </div>
    </section>
);

export default LatestPosts;