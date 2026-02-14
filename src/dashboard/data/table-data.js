export async function getTableData() {
  try {
    const res = await fetch("https://algoflow-backend.onrender.com/api/questions/getQuestions");
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    return json.questions || [];
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return [];
  }
}

