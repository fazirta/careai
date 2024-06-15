'use client'
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
import { LoaderCircle } from 'lucide-react'

const AnalisaImg = () => {
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
                <h2 className="text-lg text-center">+ AI Analysis</h2>
            </div>


            {
                (file) ?
                    <Image
                        src={file}
                        alt='Selected'
                        width={400}
                        height={400}
                    ></Image>
                    :
                    <Image
                        src={'/placeholder.jpg'}
                        alt='Selected'
                        width={400}
                        height={400}
                        priority
                    ></Image>
            }

            <Input type='file'
                aria-label='Selecciona una imagen'
                onChange={handleFileChange}
            />

            <Textarea
                rows='4'
                cols='50'
                type='text'
                value={prompt}
                onChange={handlePromptChange}
                placeholder='Analisa Gambar Anda'
            />

            <Button onClick={fetchDataProVision}>Baca Gambar</Button>

            {(response === null) ? null : <p>Jawaban : {response}</p>}


        </div>
    )
}

export default AnalisaImg
