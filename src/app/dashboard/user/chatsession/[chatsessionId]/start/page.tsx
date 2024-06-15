"use client"

import { db } from '@/app/db'
import { MockFeels } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartChatSession({ params }) {

  const [chatSessionData, setChatSessionData] = useState()
  const [mockChatSessionQuestion, setMockChatSessionQuestion] = useState()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    GetChatSessionDetails()
  }, [])

  const GetChatSessionDetails = async () => {
    const result = await db.select().from(MockFeels).where(eq(MockFeels.mockId, params.chatsessionId))
    let jsonMockRespRaw = result[0].jsonMockResp;
    const jsonMockResp = JSON.parse(jsonMockRespRaw)
    setMockChatSessionQuestion(jsonMockResp)
    setChatSessionData(result[0])
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Question */}
        <QuestionsSection
          mockChatSessionQuestion={mockChatSessionQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video / Audio Recording */}
        <RecordAnswerSection
          mockChatSessionQuestion={mockChatSessionQuestion}
          activeQuestionIndex={activeQuestionIndex}
          chatSessionData={chatSessionData}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
        {activeQuestionIndex != mockChatSessionQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
        {activeQuestionIndex == mockChatSessionQuestion?.length - 1 && <Link href={'/dashboard/user/chatsession/' + chatSessionData?.mockId + "/feedback"}><Button>End Interview</Button></Link>}
      </div>
    </div>
  )
}

export default StartChatSession
