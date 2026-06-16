const busboy = require('busboy');
const pdf = require('pdf-parse');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "API Key missing in environment." })
    };
  }

  return new Promise((resolve, reject) => {
    // Note: Netlify headers are lowercased
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType) {
      return resolve({
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing Content-Type header." })
      });
    }

    const bb = busboy({ headers: { 'content-type': contentType } });
    let fileBuffer = null;

    bb.on('file', (name, file, info) => {
      if (name === 'resume') {
        const chunks = [];
        file.on('data', (data) => chunks.push(data));
        file.on('end', () => {
          fileBuffer = Buffer.concat(chunks);
        });
      } else {
        file.resume();
      }
    });

    bb.on('finish', async () => {
      if (!fileBuffer) {
        return resolve({
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: false, error: "No file uploaded." })
        });
      }

      try {
        const pdfData = await pdf(fileBuffer);
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
             return resolve({
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: false, error: "AI returned invalid JSON format." })
             });
          }
          return resolve({
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: true, analysis })
          });
        } else {
          return resolve({
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: false, error: "Failed to generate analysis." })
          });
        }
      } catch (err) {
        console.error("Analysis Error:", err);
        return resolve({
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: false, error: "Could not parse the PDF file. Ensure it contains actual text." })
        });
      }
    });

    bb.on('error', (err) => {
      console.error("Busboy Error:", err);
      return resolve({
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, error: "Error parsing form data." })
      });
    });

    // Write the event body to busboy
    bb.write(Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8'));
    bb.end();
  });
};
