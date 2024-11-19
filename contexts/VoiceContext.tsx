"use client";

import React, { createContext, useContext, useState } from 'react';

type Voice = {
  voice_id: string;
  voice_name: string;
  preview_audio_url: string;
};

type VoiceContextType = {
  selectedVoice: Voice | null;
  setSelectedVoice: (voice: Voice | null) => void;
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  return (
    <VoiceContext.Provider value={{ selectedVoice, setSelectedVoice }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}