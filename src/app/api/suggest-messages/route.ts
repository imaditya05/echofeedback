import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function GET(req: Request) {
  // Define the prompt
  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous feedback collection platform, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on the overall expericen of the product. For example, your output should be structured like this: 'Do you have any suggestions for how we can improve our website or any features you'd like to see added?||What do you think about the design and layout of our website?||How was your overall experience using our website? . Ensure the questions are intriguing, and can help the user fairly rate the product and can help us imporve user experince.";

  // Call generateText with the prompt
  try {
    console.log("inside try");
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
    });

    if (!text) {
      return Response.json(
        {
          success: false,
          message: "Error fetching messages form OpenAI",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error fetching messages form OpenAI",
      },
      { status: 500 }
    );
  }
}
