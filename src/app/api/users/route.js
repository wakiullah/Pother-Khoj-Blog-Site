import { NextResponse } from 'next/server';

import User from '@/model/User_Model';
import { hash } from 'bcrypt';
import { dbConnect } from '@/lib/db';

export async function GET(req, res) {
    await dbConnect();
    try {
        const users = await User.find({});
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req, res) {
    await dbConnect();

    const { name, email, password, confarmPassword } = await req.json();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    if (!name || !email || !password || !confarmPassword) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== confarmPassword) {
        return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const salt = 10
    const hashedpassword = await hash(password, salt)

    const userData = {
        name,
        email,
        password: hashedpassword,
    }

    try {
        const newUser = new User(userData);
        await newUser.save();
        return NextResponse.json({ message: "Create User sucessful", redirect: '/login' }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req, res) {
    await dbConnect();
    const { id, name, email, role } = await req.json();

    let updatedData = {};
    if (name) {
        updatedData.name = name;
    }
    if (email) {
        updatedData.email = email;
    }
    if (role && id === '68a76e25111363990a89b769') {
        return NextResponse.json({ error: "You can't change this user!" }, { status: 400 })
    }
    if (role && id !== '68a76e25111363990a89b769') {
        updatedData.role = role;
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}