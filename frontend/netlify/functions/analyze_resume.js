import multipart from 'parse-multipart-data';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ success: false, error: "API Key missing in environment." }) };
    }

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "Missing Content-Type header." }) };
    }

    // Get the boundary
    const boundaryMatch = contentType.match(/boundary=(.+)$/i);
    if (!boundaryMatch) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "Missing boundary in content-type." }) };
    }
    const boundary = boundaryMatch[1];

    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "Empty request body." }) };
    }

    // Parse the body synchronously
    const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
    const parts = multipart.parse(bodyBuffer, boundary);

    // Find the 'resume' file
    const filePart = parts.find(p => p.name === 'resume');
    if (!filePart || !filePart.data) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "No file uploaded." }) };
    }

    const pdfData = await pdf(filePart.data);
    let text = pdfData.text || "";
    
    if (text.length > 15000) {
      text = text.substring(0, 15000);
    }
    
    const system_prompt = `You are an expert AI Resume Analyzer for Urmila Kshirsagar's portfolio.
You will receive the text of a user's uploaded resume.
Your job is to provide constructive, professional feedback on their resume.
Focus on:
1. Overall Impression
2. Strengths
3. Areas for Improvement
4. ATS Formatting Tips

You MUST format your entire response strictly as a JSON object matching this schema:
{
  "score": <number 1-100>,
  "summary": "<string>",
  "strengths": ["<string>", "<string>"],
  "improvements": ["<string>", "<string>"],
  "ats_tips": ["<string>", "<string>"]
}
Do not include any Markdown formatting like \`\`\`json or \`\`\`. Output ONLY raw valid JSON.`;

    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: "Here is the resume text:\n\n" + text }
      ],
      temperature: 0.2,
      max_tokens: 800
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (result.choices && result.choices.length > 0) {
      let raw_text = result.choices[0].message.content.trim();
      raw_text = raw_text.replace(/^```json/i, '').replace(/```$/i, '').trim();
      let analysis = {};
      try {
         analysis = JSON.parse(raw_text);
      } catch (e) {
         console.error("JSON parse error:", e, "Raw:", raw_text);
         return { statusCode: 500, body: JSON.stringify({ success: false, error: "AI returned invalid JSON format." }) };
      }
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, analysis })
      };
    } else {
      return { statusCode: 500, body: JSON.stringify({ success: false, error: "Failed to generate analysis." }) };
    }

  } catch (error) {
    console.error("Serverless Function Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "An internal server error occurred.", details: error.toString() })
    };
  }
};
