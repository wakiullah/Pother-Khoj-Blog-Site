import { dbConnect } from "@/lib/db";
import { userVerify } from "@/utilitis/userVerify";
import User from "@/model/User_Model";

export async function GET() {
    try {
        await dbConnect();
        const user = await userVerify();

        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const userData = await User.findById(user.id).select('-password').lean();

        if (!userData) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(userData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Get logged user error:', error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
