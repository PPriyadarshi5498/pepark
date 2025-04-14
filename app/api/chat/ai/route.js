export const maxDuration = 60;
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import Chat from "../../../../models/Chat";
import { timeStamp } from "console";

// Initialize openAi client with Deepseek API key and base URL

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(req) {
    try {
        const {userId} = getAuth(req) 
        
        // Extract chatId and prompt from the requst body
        const {chatId, prompt} = await req.json();
        if(!userId){
            return NextResponse.json({ success: false, message: "User not authenticated",});
        }

        // Find the chat document in the database based on userId and chatId
        await connectDB
        const data = await Chat.findOne({userId, _id: chatId})
      
        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timeStamp: Data.now()
        };
    
           data.messages.push(userPrompt);

        // Call the DeepSeek API to get a chat completion
        
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true,
          });

          const message = completion.choices[0].message;
          message.timeStamp = Data.now()
          data.message.push(message);
          data.save();


       return NextResponse.json({success: true, data: message})
    } catch (error) {
        return NextResponse.json({success: false, error: error.message});
    }
}