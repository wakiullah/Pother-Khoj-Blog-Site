import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sliceContent } from "@/utilitis/sliceContent";
import Link from "next/link";


function LatestPostCard({ image, category, title, author, date, content, _id }) {
    const slicedContent = sliceContent(content)

    return (
        <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="md:col-span-1 p-0">
                <img
                    src={image}
                    alt={title}
                    className="rounded-lg h-full w-auto object-cover"
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
                        By {author} / {date}
                    </p>
                    <p className="text-foreground">
                        {slicedContent}
                    </p>
                </div>
                <div>
                    <Button variant="outline">
                        <Link href={`/posts/${_id}`}>Read More</Link>                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default LatestPostCard;