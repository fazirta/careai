"use client"

import { Button } from '@/components/ui/button'
import { Mic, StopCircle, WebcamIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { chatSession } from '@/utils/GeminiAIModal'
import { toast } from 'sonner'
import { db } from '@/app/db'
import { UserAnswer } from '@/app/db/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({ mockChatSessionQuestion, activeQuestionIndex, chatSessionData }) {

    // const [webCamEnabled, setWebCamEnabled] = useState(false)
    const [userAnswer, setUserAnswer] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false)


    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer()
        }
        // if (userAnswer?.length < 10) {
        //     setLoading(false)
        //     toast('Error, Your Answer Must Be More than 3 Words')
        //     return;
        // }
    }, [userAnswer])

    const StartStopRecording = async () => {
        if (isRecording) {

            stopSpeechToText()

        } else {
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {
        console.log(userAnswer)
        setLoading(true)
        const feedbackPrompt = "Pertanyaan:" + mockChatSessionQuestion[activeQuestionIndex]?.question + ", Jawaban User:" + userAnswer +
            ", Dari pertanyaan dan jawaban user untuk Analisa Penyakitnya " + " Tolong berikan Analisa konkrit, mengenai Penyakit apa Yang dialami user "
            + " in just 3 to 5 lines to improve it in JSON format with and feedback field. Answer Using" + chatSessionData?.language + " Language"

        const result = await chatSession.sendMessage(feedbackPrompt)

        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(mockJsonResp)

        const JsonFeedbackResp = JSON.parse(mockJsonResp)

        const resp = await db.insert(UserAnswer).values({
            mockIdRef: chatSessionData?.mockId,
            question: mockChatSessionQuestion[activeQuestionIndex]?.question,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            language: chatSessionData?.language,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
        })

        if (resp) {
            toast('User Answer Recorded Successfully')
            setUserAnswer('')
            setResults([])
        }
        setResults([])
        setLoading(false)
    }

    return (
        <div>
            <div className="flex flex-col my-20 justify-center items-center bg-secondary rounded-lg p-5">
                <WebcamIcon className="h-72 w-full mb-10 rounded-lg absolute" />
                <Webcam mirrored={true} style={{
                    height: 300,
                    width: '100%',
                    zindex: 10,
                }} />
                <Button disabled={loading} variant="outline" className="my-10"
                    onClick={StartStopRecording}
                >
                    {isRecording ? <h2 className="text-red-600 animate-pulse flex gap-2 items-center"><StopCircle />Stop Recording</h2> : <h2 className="text-primary flex gap-2 items-center"><Mic />Record Answer</h2>}

                </Button>


            </div>
        </div>
    )
}

export default RecordAnswerSection
