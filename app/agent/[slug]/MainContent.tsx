import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useAgentStore from '@/store/useAgentStore'


export default function MainContent() {
  // Use the Zustand store
  const { agentName, prompt, setAgentName, setPrompt } = useAgentStore()
  const [isSaving, setIsSaving] = React.useState(false)

  // Auto-save function (now simplified due to Zustand's persistence)
  const autoSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 500)
  }

  // Debounce auto-save
  React.useEffect(() => {
    const timerId = setTimeout(autoSave, 500)
    return () => clearTimeout(timerId)
  }, [agentName, prompt])

  return (
    <MaxWidthWrapper maxWidth="lg">
      <div className="flex-1 overflow-auto p-4 ">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className='text-lg font-bold'>Name</Label>
            <Input
              id="name"
              value={agentName}
              onChange={(e) => {
                setAgentName(e.target.value)
              }}
              className="mt-1.5 mb-10"
              placeholder="Enter agent name"
            />
          </div>
          <div>
            <Label htmlFor="prompt" className='text-lg font-bold'>Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
              }}
              className="mt-1.5 min-h-[300px] "
              placeholder="Enter your prompt"
            />
          </div>
          {isSaving && (
            <div className="text-sm text-gray-500 mt-2">
              Saving...
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}