import { GoogleGenAI } from "@google/genai";
import { ThreatEvent } from "../types";

const GEMINI_MODEL = "gemini-2.5-flash-latest";

export const analyzeThreat = async (threat: ThreatEvent): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Error: API Key is missing. Cannot perform AI analysis.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are a Senior Mobile Security Analyst for a Mobile Intrusion Detection System (MIDS).
      Analyze the following security event detected on an Android device.

      Event Type: ${threat.type}
      Severity: ${threat.severity}
      Description: ${threat.description}
      Technical Details: ${JSON.stringify(threat.details, null, 2)}

      Please provide:
      1. A brief explanation of what this attack/anomaly implies.
      2. The potential impact on the user's data or device.
      3. Recommended immediate remediation steps for the user or admin.

      Keep the response concise, professional, and actionable. Format as Markdown.
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "Analysis failed due to a network or API error. Please try again.";
  }
};