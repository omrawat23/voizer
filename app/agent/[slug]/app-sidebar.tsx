'use client'

import React, { useState } from 'react'
import { Calendar, Inbox, Search, Settings, AudioLines } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import VoiceSidebar from './VoiceSidebar'

const items = [
  {
    title: "Voice",
    icon: AudioLines,
  },
  {
    title: "Inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    icon: Search,
  },
  {
    title: "Settings",
    icon: Settings,
  },
]

interface AppSidebarProps {
  agentId: number;
  selectedVoice: {
    voiceId: string;
    voiceName: string;
    previewAudioUrl: string;
  };

  onVoiceSelect: (voice: {
    voiceId: string;
    voiceName: string;
    previewAudioUrl: string;
  }) => void;
}

export function AppSidebar({selectedVoice,onVoiceSelect}:AppSidebarProps) {
  const [activeItem, setActiveItem] = useState("Voice")

  return (
    <div className="flex">
      <Sidebar className="mt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => setActiveItem(item.title)}
                      isActive={activeItem === item.title}
                    >
                      <button className="flex items-center space-x-2">
                        <item.icon className="w-6 h-6" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
      {activeItem === "Voice" && (
        <div className="w-64 border-l">
          <VoiceSidebar
           
            selectedVoice={selectedVoice}
            onVoiceSelect={onVoiceSelect}
          />
        </div>
      )}
    </div>
  )
}