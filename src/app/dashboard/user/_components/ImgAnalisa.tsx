"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

function ImgAnalisa() {
    const [openDialog, setOpenDialog] = useState(false)
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    const [file, setFile] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const genAI = new GoogleGenerativeAI(API_KEY)

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result.split(',')[1])
            reader.readAsDataURL(file)
        })
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
        }
    }
    //  ================================================
    const fetchDataProVision = async () => {
        if (!file || !prompt) {
            alert('Isi Gambar Terlebih Dahulu')
            return
        }
        setResponse(null)
        setLoading(true)
        const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

        try {
            const fileInputEl = document.querySelector('input[type=file]')
            const imageParts = await Promise.all(
                [...fileInputEl.files].map(fileToGenerativePart)
            )

            const result = await model.generateContent([prompt, ...imageParts])
            const response = await result.response
            const text = response.text()
            setLoading(false)
            setResponse(text)
            setPrompt('')
        } catch (error) {
            setError(`Ups ocurrió un error: ${error}`)
            console.log(error)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        const reader = new FileReader()
        reader.onloadend = () => {
            setFile(reader.result)
        }
        if (file && allowedTypes.includes(file.type)) {
            reader.readAsDataURL(file)
        } else {
            alert('Tolong Masukan File Image yang benar!!!')
            event.target.value = null;
        }
    }

    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
    }


    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                <h2 className="text-lg text-center">AI Image Analysis</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Analisa AI dengan Image</DialogTitle>
                        <DialogDescription>
                            <div>
                                <h4>AI ini mampu menganalisa keluhan kamu melalui gambar yang kamu kirimkan</h4>

                                {
                                    (file) ?
                                        <center><Image
                                            src={file}
                                            alt='Selected'
                                            width={280}
                                            height={280}
                                        ></Image></center>
                                        :
                                        <center><Image
                                            src={'/placeholder.jpg'}
                                            alt='Selected'
                                            width={280}
                                            height={280}
                                            priority
                                        ></Image></center>
                                }

                                <Input type='file'
                                    onChange={handleFileChange}
                                    className="my-5"
                                />

                                <div className="mt-7 my-3">
                                    <label htmlFor="">Apa Yang Kamu Mau Analisa dari gambar tersebut?</label>
                                    <Textarea required onChange={handlePromptChange} placeholder='Apa yang mau anda analisa?' />
                                </div>
                            </div>

                            {(response === null) ? null : <h1 className="text-xl text-gray-600">Jawaban : {response}</h1>}

                            <div className="flex gap-5 justify-end">
                                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type="button" variant="ghost" onClick={fetchDataProVision}>Analisa Gambar</Button>
                            </div>

                            
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ImgAnalisa
