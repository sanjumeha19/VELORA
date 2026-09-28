import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { buildAiCareerContext } from "@/data/career-taxonomy";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const profile = body.profile ?? {};
    const resume = body.resume ?? {};

    const currentResumeSkills = Array.isArray(resume.skills)
      ? resume.skills.filter(Boolean)
      : [];

    const careerContext = buildAiCareerContext(
      profile,
      currentResumeSkills
    );

    const prompt = `
You are Velora, an AI career assistant.

Analyze the user's career profile and current resume.

CAREER CONTEXT:
${JSON.stringify(careerContext, null, 2)}

CURRENT RESUME:
${JSON.stringify(resume, null, 2)}

Return ONLY valid JSON with this structure:

{
  "recommendedSkills": [],
  "recommendedTools": [],
  "missingSkills": [],
  "resumeKeywords": [],
  "projectFocus": [],
  "interviewTopics": [],
  "summarySuggestion": "",
  "explanation": []
}

Rules:
- Personalize recommendations to the user's domain and specialization.
- Do not recommend unrelated skills.
- Do not repeat skills already clearly demonstrated.
- Prioritize practical recommendations for the user's experience level.
- Keep recommendations useful for resume improvement.
- Briefly explain why important missing skills matter.
`;

    const response = await gemini.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    const result = JSON.parse(text);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Career recommendation AI error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to generate AI career recommendations.",
      },
      { status: 500 }
    );
  }
}