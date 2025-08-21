import Link from "next/link";
import React from "react";

export default function HeroCard({ image, tags, title, className = "", _id }) {
    console.log(tags)
    return (
        <Link href={`/posts/${_id}`} className={`relative rounded overflow-hidden group ${className}`}>
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="mb-2 flex gap-2">

                    <span

                        className="text-sm text-white border-b-2 border-blue-400 mr-2"
                    >
                        {tags && tags[0]}
                    </span>

                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow">
                    {title}
                </h2>
            </div>
        </Link>
    );
}