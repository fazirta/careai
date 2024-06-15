"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { MockFeels } from '@/app/db/schema'
import { db } from '@/app/db'

function AddNewChatSession() {

    const [openDialog, setOpenDialog] = useState(false)
    const [feel, setFeel] = useState()
    const [feelDesc, setFeelDesc] = useState()
    const [language, setLanguage] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState<string>([])

    const router = useRouter()

    const { user } = useUser()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        // console.log(jobPosition, jobDesc, jobExperience)

        const InputPrompt = "I Feel " + feel + ", Saya Rasa Penyebabnya Karena: " + feelDesc + ", Depends on this information please give me 5 Analysis question in Json Format, Give question as field in JSON" + " question using" + language + ' language. in the format [{"question": "question1"}, {"question": "question2"}, {"question": "question3"}, {"question": "question4"}, {"question": }]'

        const result = await chatSession.sendMessage(InputPrompt)
        let mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        setJsonResponse(mockJsonResp)


        if (mockJsonResp) {
            const resp = await db.insert(MockFeels).values({
                mockId: uuidv4(),
                jsonMockResp: mockJsonResp,
                feel: feel,
                feelDesc: feelDesc,
                language: language,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            }).returning({ mockId: MockFeels.mockId })

            console.log("Inserted ID:", resp)
            if (resp) {
                setOpenDialog(false)
                router.push('/dashboard/user/chatsession/' + resp[0]?.mockId)
            }
        } else {
            console.log("ERROR")
        }
        setLoading(false)
    }
    return (
        <div>
            <div className='p-5 border rounded-lg bg-green-400 hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>

                <h2 className="text-lg text-center">AI Analysis</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Beritahu saya apa keluhanmu hari ini? Akan Saya Bantu...</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Berikan Saya detil Keluhanmu</h2>

                                    <div className="mt-7 my-3">
                                        <label htmlFor="">Apa Yang Kamu Rasakan?</label>
                                        <Input placeholder="Cth. Sakit Kepala, Mual mual, Sakit Perut" required onChange={(event) => setFeel(event.target.value)} />
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="">Apa Kemungkinan Penyebabnya?</label>
                                        <Textarea placeholder="Ex. Saya tidak tidur semalam, Kebanyakan merokok, Dll." required onChange={(event) => setFeelDesc(event.target.value)} />
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="">Pilih Bahasa yang akan kamu gunakan</label>
                                        <Input placeholder="Ex.Indonesia" type="text" max="50" required onChange={(event) => setLanguage(event.target.value)} />
                                    </div>
                                </div>

                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <> <LoaderCircle className="animate-spin" /> 'Generating from AI' </> : 'Mulai Sesi'}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewChatSession
