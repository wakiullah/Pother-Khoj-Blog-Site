import { dbConnect } from "@/lib/db";
import { userVerify } from "@/utilitis/userVerify";

export async function GET() {
    await dbConnect()
    const user = await userVerify()

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const userResponse = await fetch(`api/users/${user.id}`)
    if (!userResponse.ok) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    const userData = await userResponse.json();
    return new Response(JSON.stringify(userData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}