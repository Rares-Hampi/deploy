import axios from "axios";

async function Summarize(question: string) {
  try {
    const response = await axios.post(
      "https://python-chat.onrender.com/summarize",
      {
        text: question,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAnswer(question: string) {
  const text = await Summarize(question);

  try {
    if (text[0] === "No keywords found") {
      return "Sorry, I did not understand your question. Please try again.";
    }
    const response = await fetch("https://node-chat-k5ua.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Add CORS headers
      },
      body: JSON.stringify({ keys: text }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function quiz(question: string, answer: string) {
  try {
    const response = await axios.post(
      "https://node-chat-k5ua.onrender.com/quiz",
      {
        question: question,
        answer: answer,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchQuest(question: string) {
  try {
    const response = await axios.post(
      "https://node-chat-k5ua.onrender.com/suggest",
      {
        question: question,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
