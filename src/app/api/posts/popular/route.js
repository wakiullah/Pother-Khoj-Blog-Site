import Posts from "@/model/Post_Model";

export async function GET(req) {
    //here i want te find most liked 3 posts
    const mostLikedPosts = await Posts.find({ statue: 'approved' }).sort({ likes: -1 }).limit(3);
    return Response.json(mostLikedPosts, { status: 200 });


}