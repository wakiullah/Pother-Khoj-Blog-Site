import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

function CreatePostForm() {
    return (
        <Card>
            <CardHeader color="info">
                <h2 className="text-2xl font-bold">Create New Post</h2>
                <p className="text-sm text-muted-foreground">
                    Fill in the details below to create a new post.
                </p>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image Link (URL must from pexels.com or unsplash.com)
                        </label>
                        <Input
                            type="url"
                            id="image"
                            name="image"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <Textarea
                            placeholder="Write your post content here..."
                            id="content"
                            name="content"
                            rows="4"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        ></Textarea>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Create Post
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CreatePostForm;