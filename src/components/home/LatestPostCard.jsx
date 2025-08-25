import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDate } from "@/utilitis/getDate";
import { sliceContent } from "@/utilitis/sliceContent";
import Image from "next/image";
import Link from "next/link";


function LatestPostCard({ post }) {
    const { _id, image, title, content, author, createdAt, category } = post;
    const { date } = getDate(createdAt)
    const slicedContent = sliceContent(content)
    return (
        <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="md:col-span-1 p-0">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={600}
                    className="w-full h-full rounded-lg object-cover"
                    priority={true}
                    quality={75}
                />
            </CardHeader>
            <CardContent className="md:col-span-2 align-middle flex justify-between flex-col">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {category}
                    </p>
                    <h3 className="text-2xl font-bold">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        By {author?.name || 'Unknown'} / {date}
                    </p>
                    <p className="text-foreground">
                        {slicedContent}
                    </p>
                </div>
                <div className="pt-3">
                    <Button variant="outline">
                        <Link href={`/posts/${_id}`}>Read More</Link>                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default LatestPostCard;