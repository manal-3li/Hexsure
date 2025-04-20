import axios from "axios";
import { HfInference } from "@huggingface/inference";

export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error(
        "HUGGINGFACE_API_KEY is not set in environment variables"
      );
    }

    console.log("Hugging Face API Key:", apiKey);
    console.log("Sending message to Hugging Face:", message);

    const modelUrl = "https://api-inference.huggingface.co/models/gpt2";

    const response = await axios.post(
      modelUrl,
      {
        inputs: `User: ${message}\nAssistant:`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Hugging Face response:", response.data);

    let reply = "Sorry, I couldn’t process that.";
    if (Array.isArray(response.data) && response.data[0]?.generated_text) {
      reply = response.data[0].generated_text;
    } else if (typeof response.data === "string") {
      reply = response.data;
    } else if (response.data.error) {
      throw new Error(response.data.error);
    }

    reply = reply.replace(/\n/g, " ").trim();
    const firstSentence = reply.split(".")[0] + ".";
    return firstSentence.length > 5 ? firstSentence : reply;
  } catch (error: any) {
    console.error("Error in getChatbotResponse:", error.message);
    if (error.response) {
      console.error("Hugging Face error details:", error.response.data);
      if (error.response.status === 429) {
        throw new Error("Hugging Face rate limit exceeded. Try again later.");
      }
      if (error.response.status === 503) {
        throw new Error(
          "Model is loading or unavailable. Please try again later."
        );
      }
      if (error.response.status === 500) {
        throw new Error(
          "Hugging Face server error. Try a different model or wait."
        );
      }
    }
    throw new Error(
      `Failed to get response from Hugging Face: ${error.message}`
    );
  }
};
