'use client'

import { useParams, useRouter } from 'next/navigation'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { agents } from '@/constants/constants'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function Navbar() {
  const params = useParams()
  const router = useRouter()
  const agentId = parseInt(params.slug as string)
  const agent = agents.find(a => a.id === agentId)
  
  const [agentName, setAgentName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`agent_${agentId}_name`) || agent?.name || ''
    }
    return agent?.name || ''
  })

  useEffect(() => {
    if (agent && typeof window !== 'undefined') {
      localStorage.setItem(`agent_${agentId}_name`, agentName)
    }
  }, [agentName, agentId, agent])

  if (!agent) return null

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50">
      <div className="flex h-full items-center justify-between px-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Button>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={agent.avatar} alt={agentName} />
          </Avatar>
          <Input 
            className="w-48 bg-primary-foreground text-primary"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            aria-label="Agent name"
          />
        </div>
        <div className="w-[100px]" /> {/* Spacer to balance the layout */}
      </div>
    </header>
  )
}