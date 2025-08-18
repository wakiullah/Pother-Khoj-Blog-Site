import {NextResponse} from 'next/server';

const {dbConnect} = require('@/lib/db');
const User = require('@/model/User_Model');

export async function GET(req, res) {
    await dbConnect();
    try {
        const users = await User.find({});
        return NextResponse.json(users, {status: 200});
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}


export async function POST(req, res) {
    await dbConnect();

    const {name, email, password, confarmPassword} = await req.json();

    if (!name || !email || !password || !confarmPassword) {
        return NextResponse.json({error: "All fields are required"}, {status: 400});
    }

    if (password !== confarmPassword) {
        return NextResponse.json({error: "Passwords do not match"}, {status: 400});
    }

    try {
        const newUser = new User({name, email, password, confarmPassword});
        await newUser.save();
        console.log('User created successfully');
        return NextResponse.redirect('/login', {
            status: 302,
        })
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}