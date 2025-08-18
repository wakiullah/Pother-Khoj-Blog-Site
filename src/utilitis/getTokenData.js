import {cookies} from 'next/headers';

export async function getTokenData() {

    const token = await cookies()
    const stringToken = token.getAll()[0]?.value

    return stringToken ? stringToken : null;
}