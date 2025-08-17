import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function LatestPostCard({ image, category, title, author, date, excerpt }) {


    return (
        <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="md:col-span-1 p-0">
                <img
                    src={image}
                    alt={title}
                    className="rounded-lg h-full w-auto object-cover"
                />
            </CardHeader>
            <CardContent className="md:col-span-2 align-middle">
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
                    {excerpt}
                </p>
                <Button variant="outline">
                    Read More
                </Button>
            </CardContent>
        </Card>
    );
}

export default LatestPostCard;