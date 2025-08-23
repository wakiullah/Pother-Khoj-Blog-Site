import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroCard({ image, tags, title, className = "", _id }) {
    return (
        <Link href={`/posts/${_id}`} className={`relative rounded overflow-hidden group ${className}`}>
            <Image
                src={image}
                alt={title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority={true}
                quality={75}
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
                <h2 className="text-lg md:text-2xl font-bold text-white leading-tight drop-shadow">
                    {title}
                </h2>
            </div>
        </Link>
    );
}