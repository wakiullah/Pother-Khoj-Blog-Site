
import { apiRequest } from "@/utils/api";
import HeroCard from "./HeroCard";

export default async function Hero() {
    const data = await apiRequest('/posts/hero')
    return (
        <section className="container px-4 py-8 mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 
                           sm:grid-cols-2 
                           lg:grid-cols-4 lg:grid-rows-2 lg:gap-8">
                {/* Left column */}
                <div className="flex flex-col gap-4 sm:gap-6 
                               sm:col-span-1
                               lg:row-span-2">
                    <HeroCard {...data[0]} className="h-64 sm:h-72 lg:h-full" />
                    <HeroCard {...data[2]} className="h-64 sm:h-72 lg:h-full" />
                </div>

                {/* Center big card */}
                <div className="sm:col-span-2 lg:row-span-2">
                    <HeroCard {...data[1]} className="h-64 sm:h-[calc(100%-2rem)] lg:h-full" />
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4 sm:gap-6
                               sm:col-span-1 
                               lg:row-span-2">
                    <HeroCard {...data[3]} className="h-64 sm:h-72 lg:h-full" />
                    <HeroCard {...data[4]} className="h-64 sm:h-72 lg:h-full" />
                </div>
            </div>
        </section>
    );
}  