exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const user_input = (data.message || '').trim();

    if (!user_input) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "Please ask a question." })
      };
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "I'm sorry, the chatbot is currently unavailable due to missing configuration." })
      };
    }

    const system_prompt = `You are an AI assistant for Urmila Kshirsagar's portfolio. Your only job is to answer questions about Urmila, her portfolio, projects, skills, education, and contact details. Urmila is a Python Developer & AI/Data Science Student at DMCE (CGPA: 8.7). Skills: Python, Flask, Scikit-learn, Pandas, SQL, Java, HTML/CSS. She has 15+ projects (AI Career Recommender, Plagiarism Detector, Face Recognition System, Weather App). She has 8+ certifications (IBM, Google, AWS, deeplearning.ai). Contact: urmilakshirsagar1945@gmail.com. Location: Mumbai, Maharashtra, India. If a user asks about something completely unrelated to Urmila or her portfolio, politely refuse to answer and remind them that you are Urmila's portfolio assistant. Keep responses concise, friendly, and professional.`;

    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: user_input }
      ],
      temperature: 0.3,
      max_tokens: 150
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
    let reply = "";
    if (result.choices && result.choices.length > 0) {
      reply = result.choices[0].message.content;
    } else {
      reply = "Sorry, I couldn't generate a response.";
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("Chat Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "An error occurred while processing your request." })
    };
  }
};
