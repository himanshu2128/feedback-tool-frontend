export const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function submitFeedback({ message }) {
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  return response.json();
}

export async function getAllFeedback() {
  const response = await fetch(`${API_BASE_URL}/api/feedback`);
  return response.json();
}
