import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.NEBIUS_API_KEY,
  baseURL: process.env.NEBIUS_BASE_URL,
});


async function transcribeImage(imageBase64: string) {
  const response = await client.chat.completions.create({
    temperature: 0,
    model: "Qwen/Qwen2-VL-72B-Instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract text from the image provided. Respond with a clean transcription of the text.",
          },
          {
            type: "image_url",
            image_url: {
              url: `${imageBase64}`,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
}

// API route for transcribing images
export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  if (!imageBase64) {
    return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
  }

  try {
    const transcription = await transcribeImage(imageBase64);
    return NextResponse.json({ transcription });
  } catch (error) {
    console.error('Error transcribing image:', error);
    return NextResponse.json({ error: 'Failed to transcribe image' }, { status: 500 });
  }
}
