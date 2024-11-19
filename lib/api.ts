export async function fetchVoices() {
  const response = await fetch('/api/voices');
  if (!response.ok) {
    throw new Error('Failed to fetch voices');
  }
  return response.json();
}