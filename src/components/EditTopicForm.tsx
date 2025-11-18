'use client'

import { updateTopic } from '@/actions/topicActions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface EditTopicFormProps {
  id: string
  title: string
  description: string
}

export default function EditTopicForm({
  id,
  title,
  description,
}: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateTopic(id, newTitle, newDescription)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-slate-500 p-4"
        placeholder="Topic Title"
        value={newTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewTitle(e.target.value)
        }}
      />
      <textarea
        className="border border-slate-500 p-4 h-32"
        placeholder="Topic Description"
        value={newDescription}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setNewDescription(e.target.value)
        }}
      />
      <button
        className="bg-blue-800 text-white font-bold px-6 py-3 w-fit rounded-md"
        type="submit"
      >
        Update Topic
      </button>
    </form>
  )
}
