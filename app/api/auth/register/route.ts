import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {username,email,password} = await req.json();

        if(!email || !password){
            return NextResponse.json(
                {error:"Email and password are required!"},
                {status:400}
            );
        }

        await connectDB();

        const existingUser = await User.findOne({email});
        if(existingUser){
             return NextResponse.json(
                {error:"User already registered!"},
                {status:400}
            );
        }

        await User.create({
            username,
            email,
            password,
        })

        return NextResponse.json(
                {message:"User registered!"},
                {status:201}
        );

    } catch (error) {
        console.error("Error in registering the user",error);
        return NextResponse.json(
                {error:"Failed to register user!"},
                {status:400}
            );
    }
}