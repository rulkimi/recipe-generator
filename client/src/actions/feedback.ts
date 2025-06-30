"use server"

export const giveFeedback = async (logId: string, feedback: "good" | "bad", previous?: "good" | "bad") => {
  try {
    const url = `${process.env.API_URL}/feedback/${logId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback, previous_feedback: previous }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFeedbackCounts = async (logId: string) => {
  try {
    const url = `${process.env.API_URL}/feedback/${logId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}