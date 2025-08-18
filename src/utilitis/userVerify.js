import {cookies} from 'next/headers';
import {getTokenData} from "@/utilitis/getTokenData";

const jose = require('jose');


export async function userVerify() {

    const token = await getTokenData()

    if (!token) {
        return null
    } else {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload} = await jose.jwtVerify(token, secret);
        const data = {
            username: payload.username,
            email: payload.email,

        }
        return data
    }


}