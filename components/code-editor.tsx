"use client"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  theme?: string
  height?: string
}

export function CodeEditor({ value, onChange, language, theme = "vs-dark", height = "100%" }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<any>(null)

  useEffect(() => {
    // Monaco Editor would be loaded here in a real implementation
    // For now, we'll create a simple textarea fallback
    if (editorRef.current && !monacoRef.current) {
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.className = `
        w-full h-full bg-slate-900 text-white font-mono text-sm 
        border-none outline-none resize-none p-4
        scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800
      `
      textarea.style.minHeight = "400px"
      textarea.addEventListener("input", (e) => {
        onChange((e.target as HTMLTextAreaElement).value)
      })

      editorRef.current.appendChild(textarea)
      monacoRef.current = textarea
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current && monacoRef.current.value !== value) {
      monacoRef.current.value = value
    }
  }, [value])

  return (
    <div
      ref={editorRef}
      className="w-full h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden"
      style={{ height }}
    />
  )
}
