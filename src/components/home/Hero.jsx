import { apiRequest } from "@/utils/api";
import HeroCard from "./HeroCard";

const cards = [
    {
        image: "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg",
        categories: ["Lifestyle"],
        title: "Amusement Park Rides",
        className: "row-span-1 col-span-1",
    },
    {
        image: "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg",
        categories: ["Lifestyle"],
        title: "Morning Coffee Always Best",
        className: "row-span-2 col-span-2",
    },
    {
        image: "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg",
        categories: ["Lifestyle", "Travel"],
        title: "Amazing Street Fire Show",
        className: "row-span-1 col-span-1",
    },
    {
        image: "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg",
        categories: ["Travel"],
        title: "Great Places to Eat",
        className: "row-span-1 col-span-1",
    },
    {
        image: "https://a.storyblok.com/f/112937/568x400/686f87dc2f/50-things-you-need-to-do-on-your-next-trip_square-568x400.jpg/m/620x0/filters:quality(70)/",
        categories: ["Lifestyle"],
        title: "Listen Good Music",
        className: "row-span-1 col-span-1",
    },
];

export default async function Hero() {

    const data = await apiRequest('/posts/hero')
    return (
        <section className="px-4 py-8 w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-6">
                {/* Left column */}
                <div className="flex flex-col gap-6 md:col-span-1 md:row-span-2">
                    <HeroCard {...data[0]} className="h-48 md:h-full" />
                    <HeroCard {...data[2]} className="h-48 md:h-full" />
                </div>
                {/* Center big card */}
                <div className="md:col-span-2 md:row-span-2">
                    <HeroCard {...data[1]} className="h-48 md:h-full" />
                </div>
                {/* Right column */}
                <div className="flex flex-col gap-6 md:col-span-1 md:row-span-2">
                    <HeroCard {...data[3]} className="h-48 md:h-full" />
                    <HeroCard {...data[4]} className="h-48 md:h-full" />
                </div>
            </div>
        </section>
    );
}