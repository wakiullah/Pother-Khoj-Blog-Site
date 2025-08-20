import { dbConnect } from "@/lib/db";
import User from "@/model/User_Model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(req) {
    await dbConnect();
    const url = new URL(req.url);
    // const userId = searchParams.get('userid');
    //get userId from url
    const userId = url.pathname.split('/').pop();


    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ name: user.name, email: user.email, role: user.role, id: user._id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PATCH(req) {
    await dbConnect();
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop();

    const { name, email } = await req.json();

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop();

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}