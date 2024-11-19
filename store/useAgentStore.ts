'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the store interface
interface AgentStore {
  agentName: string;
  prompt: string;
  selectedVoice: {
    voiceId: string;
    voiceName: string;
    previewAudioUrl: string;
  };
  setAgentName: (name: string) => void;
  setPrompt: (prompt: string) => void;
  setSelectedVoice: (voice: {
    voiceId: string;
    voiceName: string;
    previewAudioUrl: string;
  }) => void;
}

// Create the Zustand store with persistence
const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      agentName: '',
      prompt: '',
      selectedVoice: {
        voiceId: '',
        voiceName: '',
        previewAudioUrl: ''
      },
      setAgentName: (name) => set({ agentName: name }),
      setPrompt: (prompt) => set({ prompt: prompt }),
      setSelectedVoice: (voice) => set({ selectedVoice: voice })
    }),
    {
      name: 'agent-page-storage',
      partialize: (state) => ({
        agentName: state.agentName,
        prompt: state.prompt,
        selectedVoice: state.selectedVoice
      })
    }
  )
)

export default useAgentStore