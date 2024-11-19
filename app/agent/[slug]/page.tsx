'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ActionSidebar from './ActionSidebar'
import { agents } from '@/constants/constants'
import MainContent from './MainContent'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import Navbar from "./Navbar"
import useAgentStore from '@/store/useAgentStore'

export default function AgentPage() {
  const params = useParams()
  const agentId = parseInt(params.slug as string)
  
  // Use the Zustand store
  const { selectedVoice, setSelectedVoice } = useAgentStore()
  
  const agent = agents.find(a => a.id === agentId)
  if (!agent) {
    return <div>Agent not found</div>
  }
  
  const handleVoiceSelect = (voice: { voiceId: string; voiceName: string; previewAudioUrl: string }) => {
    setSelectedVoice(voice)
  }
  
  return (
    <div className='bg-gray-100 dark:bg-background'>
      <Navbar />
      <SidebarProvider>
        <AppSidebar 
          agentId={agentId}
          selectedVoice={selectedVoice}
          onVoiceSelect={handleVoiceSelect}
        />
        <main className="w-full mr-64">
          <div className="flex h-screen">
            <main className="flex-1 mt-32">
              <MainContent />
            </main>
            <ActionSidebar selectedVoice={selectedVoice} />
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}