import {NextResponse} from 'next/server';

const {dbConnect} = require('@/lib/db');
import User from '@/model/User_Model';

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

    const existingUser = await User.findOne({email});
    // if (existingUser) {
    //     return NextResponse.json({error: "User already exists"}, {status: 400});
    // }

    if (!name || !email || !password || !confarmPassword) {
        return NextResponse.json({error: "All fields are required"}, {status: 400});
    }

    if (password !== confarmPassword) {
        return NextResponse.json({error: "Passwords do not match"}, {status: 400});
    }
    if (password.length < 6) {
        return NextResponse.json({error: "Password must be at least 6 characters long"}, {status: 400});
    }

    const userData = {
        name,
        email,
        password,
    }

    try {
        const newUser = new User(userData);
        await newUser.save();
        return NextResponse.json({message: "Create User sucessful", redirect: '/login'}, {status: 201});
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function PUT(req, res) {
    await dbConnect();
    const {id, name, email} = await req.json();

    if (!id || !name || !email) {
        return NextResponse.json({error: "ID, name, and email are required"}, {status: 400});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {name, email}, {new: true});
        if (!updatedUser) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json(updatedUser, {status: 200});
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}