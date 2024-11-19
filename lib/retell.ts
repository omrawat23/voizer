import Retell from 'retell-sdk';

// Define TypeScript interface for agent configuration
interface AgentConfig {
  agent_id: string;
  response_engine: {
    type: string;
    llm_id: string;
  };
  agent_name: string;
  voice_id: string;
  voice_model?: string;
  fallback_voice_ids?: string[];
  voice_temperature?: number;
  voice_speed?: number;
  volume?: number;
  responsiveness?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  backchannel_frequency?: number;
  backchannel_words?: string[];
  // ... other properties from the provided configuration
}

export const retellClient = new Retell({ 
  apiKey: process.env.RETELL_API_KEY || ''
});

export async function listAgents(): Promise<AgentConfig[]> {
  try {
    const agentsResponse = await retellClient.agent.list();
    return agentsResponse;
  } catch (error) {
    console.error('Error listing agents:', error);
    return [];
  }
}