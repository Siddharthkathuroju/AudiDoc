import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req){
  
    const { text } = await req.json();
    console.log("Received text:", text);

    if (!text) {
      return new Response(JSON.stringify({ error: "Text input is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API key:", apiKey);

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined");
      throw new Error("Missing API key");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    try{
    const result = await chatSession.sendMessage(text);
    const generatedText = result.response.text();
    console.log("Generated text:", generatedText);

    return new Response(
      JSON.stringify({
        content: generatedText
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating content:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
