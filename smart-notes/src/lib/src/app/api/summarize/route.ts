import OpenAI from "openai";

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

  return Response.json({
    summary: response.choices[0].message.content,
  });
}