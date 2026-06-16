export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    let rawBody = event.body || '{}';
    if (event.isBase64Encoded) {
      rawBody = Buffer.from(rawBody, 'base64').toString('utf-8');
    }
    const data = JSON.parse(rawBody);
    const user_input = (data.message || '').trim().toLowerCase();

    if (!user_input) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: "Please ask a question." })
      };
    }

    let reply = "I'm Urmila's automated assistant! You can ask me about her skills, projects, education, or contact info.";

    // Rule-based logic matching user text
    if (user_input.includes('hi') || user_input.includes('hello') || user_input.includes('hey')) {
      reply = "Hi there! 👋 I'm Urmila's virtual assistant. Ask me anything about her skills, projects, or how to contact her!";
    } else if (user_input.includes('skill') || user_input.includes('tech') || user_input.includes('stack')) {
      reply = "Urmila is skilled in Python, Java, HTML/CSS, JavaScript, SQL, Flask, React, Machine Learning, and Data Science. She loves building intelligent systems!";
    } else if (user_input.includes('project') || user_input.includes('portfolio') || user_input.includes('work')) {
      reply = "Urmila has built over 15 projects including an AI Career Recommender, a Plagiarism Detector, a Face Recognition System, and this very portfolio! Check out the Projects section for more details.";
    } else if (user_input.includes('contact') || user_input.includes('email') || user_input.includes('hire') || user_input.includes('reach')) {
      reply = "You can reach Urmila via email at urmilakshirsagar1945@gmail.com, or connect with her on LinkedIn or GitHub through the links in the footer!";
    } else if (user_input.includes('education') || user_input.includes('college') || user_input.includes('degree') || user_input.includes('cgpa')) {
      reply = "Urmila is currently pursuing her B.E. in Artificial Intelligence & Data Science at Datta Meghe College of Engineering, with an excellent CGPA of 8.7!";
    } else if (user_input.includes('resume') || user_input.includes('cv')) {
      reply = "You can download Urmila's full resume using the 'Download CV' button on the Welcome page!";
    } else if (user_input.includes('certif') || user_input.includes('course')) {
      reply = "She holds 8+ professional certifications from top institutions like IBM, Google, AWS, and deeplearning.ai. See the Knowledge section for the full list!";
    } else if (user_input.includes('who are you') || user_input.includes('your name') || user_input.includes('bot')) {
      reply = "I am a custom virtual assistant built by Urmila to help you quickly find the information you need about her professional background!";
    } else if (user_input.includes('bye') || user_input.includes('thanks') || user_input.includes('thank you')) {
      reply = "You're very welcome! Feel free to ask if you need anything else. Have a great day!";
    } else if (user_input.includes('urmila')) {
      reply = "Urmila is an ambitious AI & Data Science student and Python Developer who loves turning ideas into intelligent software. What would you like to know about her?";
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("Chat Error:", error);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: "An error occurred while processing your request. Please try again." })
    };
  }
};
