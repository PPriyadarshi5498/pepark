import Chat from "../../../../models/Chat";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const  { userId } = getAuth(req);

        if(!userId) {return NextResponse.json({success: false, message: "user not authenticated",});
    }

    const {chatId, name} = await req.json();
    // Connect to the database and update the chat name
    await connectDB();

    await Chat.findOneAndUpdate({_id: chatId, userId}, {name});

    return NextResponse.json({ success: true, message: "chat Renamed" });

    } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
    }
}