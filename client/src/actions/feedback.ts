"use server"

export const giveFeedback = async (logId: string, feedback: "good" | "bad") => {
  try {
    const url = `${process.env.API_URL}/feedback/${logId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
