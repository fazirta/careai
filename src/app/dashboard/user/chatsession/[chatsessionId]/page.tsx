"use client"

import { db } from '@/app/db'
import { MockFeels } from '@/app/db/schema'
import { Button } from '@/components/ui/button'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function ChatSession({ params }) {

    const [chatSessionData, setChatSessionData] = useState()
    const [webCamEnabled, setWebCamEnabled] = useState(false)

    useEffect(() => {
        console.log(params.chatsessionId)
        GetChatSessionDetails()
    }, [])

    const GetChatSessionDetails = async () => {
        const result = await db.select().from(MockFeels).where(eq(MockFeels.mockId, params.chatsessionId))

        // console.log(result)
        setChatSessionData(result[0])
    }

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Mulai Analisa AI</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
                    {chatSessionData ? (
                        <div className="flex flex-col p-5 rounded-lg border gap-5">
                            <h2 className="text-lg"><strong>Keluhan :</strong>{chatSessionData.feel}</h2>
                            <h2 className="text-lg"><strong>Kemungkinan Penyebab :</strong>{chatSessionData.feelDesc}</h2>
                            <h2 className="text-lg"><strong>Bahasa yang digunakan :</strong>{chatSessionData.language}</h2>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>

                <div>
                    {webCamEnabled ? (
                      <center>
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{ height: 300, width: 300 }}
                        /></center>
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                                Aktifkan Web Cam dan Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-end items-end">
                <Link href={'/dashboard/user/chatsession/'+ params.chatsessionId+'/start'}>
                    <Button>Mulai Sesi</Button>
                </Link>
            </div>
        </div>
    )
}

export default ChatSession
