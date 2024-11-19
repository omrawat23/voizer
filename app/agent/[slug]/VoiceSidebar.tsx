'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Search, Play, Pause } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { agents } from '@/constants/constants'
import Image from 'next/image'
import { fetchVoices } from '@/lib/api'
import type { Voice } from '@/app/api/voices/route'

export interface VoiceSidebarProps {
  selectedVoice: {
    voiceId: string;
    voiceName: string;
    previewAudioUrl: string;
  };
  onVoiceSelect: (voice: { voiceId: string; voiceName: string; previewAudioUrl: string }) => void;
}

export default function VoiceSidebar({ selectedVoice, onVoiceSelect }: VoiceSidebarProps) {
  const router = useRouter()
  const params = useParams()
  const agentId = parseInt(params.slug as string)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [voices, setVoices] = React.useState<Record<string, Voice[]>>({})
  const [loading, setLoading] = React.useState(true)
  const [playingVoiceId, setPlayingVoiceId] = React.useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const agent = agents.find(a => a.id === agentId)

  useEffect(() => {
    const getVoices = async () => {
      try {
        const voicesByAccent = await fetchVoices();
        setVoices(voicesByAccent);
      } catch (error) {
        console.error('Error fetching voices:', error);
      } finally {
        setLoading(false);
      }
    };

    getVoices();
  }, []);
  

  const handlePlayPause = (voiceId: string, previewAudioUrl: string) => {
    if (playingVoiceId === voiceId) {
      audioRef.current?.pause()
      setPlayingVoiceId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      audioRef.current = new Audio(previewAudioUrl)
      audioRef.current.play()
      setPlayingVoiceId(voiceId)

      audioRef.current.onended = () => {
        setPlayingVoiceId(null)
      }
    }
  }

  const handleVoiceSelect = (voiceId: string, voiceName: string, previewAudioUrl: string) => {
    onVoiceSelect({ voiceId, voiceName, previewAudioUrl })
  }

  if (!agent) {
    return (
      <div className="p-4 dark:bg-black dark:text-white bg-white text-black">
        <Button 
          variant="ghost" 
          className="mb-4 dark:text-white dark:hover:bg-neutral-800 text-black hover:bg-neutral-100" 
          onClick={() => router.back()}
        >
          Back
        </Button>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Agent not found</h1>
        </div>
      </div>
    )
  }

  const filteredVoices = Object.entries(voices).reduce((acc: Record<string, Voice[]>, [accent, voiceList]) => {
    acc[accent] = voiceList.filter(
      voice => voice.voice_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return acc
  }, {})

  return (
    <div className="w-72 fixed top-16 h-screen flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-lg font-semibold">Select Voice</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
          <Input
            placeholder="Search Voice"
            className="pl-9 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-4">
        {loading ? (
          <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">Loading voices...</div>
        ) : (
          <div className="px-2">
            {Object.entries(filteredVoices).map(([accent, voiceList]) => (
              <div key={accent} className="mb-6">
                <div className="px-2 mb-2 text-sm text-neutral-600 dark:text-neutral-400">{accent}</div>
                {voiceList.map(({ voice_id, voice_name, gender, avatar_url, preview_audio_url }) => (
                  <button
                    key={voice_id}
                    onClick={() => handleVoiceSelect(voice_id, voice_name, preview_audio_url)}
                    className={`w-full px-2 py-2 rounded flex items-center justify-between 
                      hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left 
                      ${selectedVoice.voiceId === voice_id ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 mr-2">
                        <Image
                          fill
                          src={avatar_url}
                          alt={voice_name}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span>{voice_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        gender === 'female' 
                          ? 'bg-pink-500/20 text-pink-600 dark:bg-pink-500/30 dark:text-pink-400' 
                          : 'bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400'
                      }`}>
                        {gender}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlayPause(voice_id, preview_audio_url)
                        }}
                      >
                        {playingVoiceId === voice_id ? (
                          <Pause className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        ) : (
                          <Play className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        )}
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}