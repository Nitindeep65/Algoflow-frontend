const API_BASE = "http://localhost:5001/api";

export async function getQuestionById(id) {
  try {
    const res = await fetch(`http://localhost:5001/api/questions/getQuestion/${id}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    return json.question || null;
  } catch (error) {
    console.error('Failed to fetch question details:', error);
    return null;
  }
}


export async function runCode({ questionId, code }) {
  const res = await fetch(`${API_BASE}/submissions/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId, code }),
  });

  if (!res.ok) {
    throw new Error("Failed to run code");
  }

  return await res.json();
}
