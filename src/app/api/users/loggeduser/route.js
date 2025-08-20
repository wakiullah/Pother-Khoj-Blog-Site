import {userVerify} from "@/utilitis/userVerify";

export async function GET() {

    const user = await userVerify()

    if (!user) {
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`)
    if (!userResponse.ok) {
        return new Response(JSON.stringify({error: "User not found"}), {status: 404});
    }
    const userData = await userResponse.json();
    return new Response(JSON.stringify(userData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}