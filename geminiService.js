import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const classifyWaste = async (imageData) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: "Classify this waste item into one of these categories: Organic, Plastic, Metal, E-waste. Also provide a brief recycling tip." },
            { inlineData: { mimeType: "image/jpeg", data: imageData } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Waste classification error:", error);
    return { category: "Unknown", tip: "Please try again with a clearer image." };
  }
};

export const getWasteInsights = async (historicalData) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this waste generation data and provide 3 actionable insights for the municipality to reduce waste: ${JSON.stringify(historicalData)}`,
    });
    return response.text;
  } catch (error) {
    console.error("Waste insights error:", error);
    return "Unable to generate insights at this time.";
  }
};
