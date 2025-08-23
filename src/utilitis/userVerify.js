import { getTokenData } from "@/utilitis/getTokenData";
import { jwtVerify } from "jose";

export async function userVerify() {

    const token = await getTokenData()
    if (!token || token.split('.').length !== 3) {
        return null; // Invalid token format

    } else {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const data = {
            username: payload.username,
            email: payload.email,
            id: payload.id,
            role: payload.role
        }
        return data
    }


}