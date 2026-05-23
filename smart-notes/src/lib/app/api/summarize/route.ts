import OpenAI from "openai";
import { supabase } from "../../../supabase";

//This API route takes in study notes, returns a clear summary using OpenAI's GPT-4.1-mini model,
//and saves the original notes to the Supabase database for future reference.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "Summarize study notes clearly.",
      },
      {
        role: "user",
        content: body.content,
      },
    ],
  });

  await supabase.from("notes").insert({
    title: body.title,
    content: body.content,
  });

  return Response.json({
    success: true,
    summary: response.choices?.[0]?.message?.content ?? null,
  });
}

