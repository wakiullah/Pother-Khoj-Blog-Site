import Hero from "@/components/home/Hero";
import LatestPostCard from "@/components/home/LatestPostCard";
import LatestPosts from "@/components/home/latestPosts";
import PopularBlogs from "@/components/home/PopularBlogs";

const page = () => {
    return (<>
        <Hero />
        <PopularBlogs />
        <LatestPosts />
    </>
    );

}

export default page;