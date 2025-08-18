import {cookies} from 'next/headers';

export async function getTokenData() {

    const token = await cookies()
    const stringToken = token.get('token')?.value
    return stringToken ? stringToken : null;
}