'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui/select" 
import { 
  Sidebar, 
  SidebarContent, 
} from "@/components/ui/sidebar" 
import { Play, Pause } from 'lucide-react'

interface ActionSidebarProps {
  selectedVoice: {
    voiceId: string
    voiceName: string
    previewAudioUrl: string
  }
}

export default function ActionSidebar({ selectedVoice }: ActionSidebarProps) {
  const [activeMode, setActiveMode] = useState<'call' | 'chat'>('call')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    audioRef.current = new Audio(selectedVoice.previewAudioUrl)
  }, [selectedVoice])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  return ( 
    <Sidebar className="fixed right-0 top-16 w-72 h-screen border-l dark:border-gray-700" collapsible="none"> 
      <SidebarContent> 
        <div className="p-4 space-y-4"> 
          <div className="grid grid-cols-2 gap-2"> 
            <Button 
              variant={activeMode === 'call' ? 'default' : 'outline'} 
              className="w-full"
              onClick={() => setActiveMode('call')}
            > 
              Test Call 
            </Button> 
            <Button 
              variant={activeMode === 'chat' ? 'default' : 'outline'} 
              className="w-full"
              onClick={() => setActiveMode('chat')}
            > 
              Test Chat 
            </Button> 
          </div>

          <div className="space-y-2">
            <Label>Selected Voice</Label>
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded">
              <span className="dark:text-gray-200">{selectedVoice.voiceName || 'No voice selected'}</span>
              {selectedVoice.previewAudioUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {activeMode === 'call' && (
            <div className="space-y-4"> 
              <div className="space-y-2"> 
                <Select> 
                  <SelectTrigger id="phone"> 
                    <SelectValue placeholder="Select Phone Number" /> 
                  </SelectTrigger> 
                  <SelectContent> 
                    <SelectItem value="1">+1 (555) 000-0000</SelectItem> 
                    <SelectItem value="2">+1 (555) 000-0001</SelectItem> 
                  </SelectContent> 
                </Select> 
              </div> 
              <div className="space-y-2"> 
                <Input id="caller-name" placeholder="Enter Name" /> 
              </div> 
              <div className="space-y-2"> 
                <Input id="caller-phone" placeholder="Enter Phone Number" /> 
              </div> 
              <Button className="w-full"> 
                Call Me 
              </Button> 
            </div>
          )}

          {activeMode === 'chat' && (
            <div className="space-y-4">
              <div className="h-48 overflow-y-auto border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                {messages.length === 0 ? (
                  <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No messages yet
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded shadow-sm"
                    >
                      {msg}
                    </div>
                  ))
                )}
              </div>
              <div className="flex space-x-2">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message"
                  className="flex-grow"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage()
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div> 
      </SidebarContent> 
    </Sidebar> 
  ) 
}