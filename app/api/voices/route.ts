import Retell from 'retell-sdk'

const client = new Retell({
    apiKey: process.env.NEXT_PUBLIC_RETELL_API_KEY || '',
})

export interface Voice {
  voice_id: string;
  voice_name: string;
  gender: string;
  age: number;
  accent: string;
  avatar_url: string;
  preview_audio_url: string;
}

export async function GET() {
  try {
    const voices: Voice[] = (await client.voice.list()) as unknown as Voice[];
    
    // Group voices by accent
    const voicesByAccent = voices.reduce(
      (acc: Record<string, Voice[]>, voice: Voice) => {
        const accent = voice.accent || 'Unknown';
        if (!acc[accent]) acc[accent] = [];
        acc[accent].push(voice);
        return acc;
      },
      {}
    );

    return Response.json(voicesByAccent);
  } catch (error) {
    console.error('Error fetching voices:', error);
    return Response.json(
      { error: 'Failed to fetch voices' },
      { status: 500 }
    );
  }
}