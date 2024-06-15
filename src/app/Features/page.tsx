import { Button } from '@/components/ui/button'
import Header from '@/modules/LandingPageModule/utils/Header'
import { BotMessageSquare, Headset, Images } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const features = () => {
  return (
    <>
      <Header />
      <img className="w-screen h-screen bg-cover fixed top-0 left-0 bg-center -z-10" src="bg.png" alt="" />
      <h1 className=" z-10 my-3 lg:text-3xl md:text-2xl sm:text-xl font-semibold text-center text-blue-900">
        Our Feature
      </h1>
      <div className='z-10 flex gap 2 items-center justify-center'>
        <div className='mr-4 ml-80 my-3 p-5 w-1/2 h-full border bg-white rounded-lg'>
          <BotMessageSquare className='w-full h-full p-3' />
        </div>
        <div className='mr-80 ml-4 my-3 p-5 w-full h-full border bg-white rounded-lg'>
          <h1 className='font-bold text-2xl'>Consult  with AI 24/7</h1>
          <p>Experience the future of healthcare with our AI-powered health consultation chatbot. Our intelligent chatbot provides instant medical advice, answers your health-related questions, and guides you through symptoms with precision and care. Whether you need quick information or detailed guidance, our chatbot is here to assist you, anytime, anywhere.</p>
          <Link href={"/dashboard/user"}><Button className="mt-2 w-40 rounded-full">Try Now</Button></Link>
        </div>
      </div>
      <div className='z-10 flex gap 2 items-center justify-center'>
        <div className='mr-4 ml-80 my-3 p-5 w-full h-full border bg-white rounded-lg'>
          <h1 className='font-bold text-2xl'>Analyze symptoms by  image</h1>
          <p>Unlock the power of advanced AI technology with our Symptom Analyzation by Image feature. Simply upload an image of your symptom, and our sophisticated AI system will analyze it to provide an accurate and prompt assessment. This innovative tool helps in identifying potential health issues, offering you peace of mind and directing you towards the appropriate care swiftly and effectively.</p>
          <Link href={"/dashboard/user"}><Button className="mt-2 w-40 rounded-full">Try Now</Button></Link>
        </div>
        <div className='mr-80 ml-4 my-3 p-5 w-1/2 h-full border bg-white rounded-lg'>
          <Images className='w-full h-full p-3' />
        </div>
      </div>
      <div className='z-10 flex gap 2 items-center justify-center'>
        <div className='mr-4 ml-80 my-3 p-5 w-1/2 h-full border bg-white rounded-lg'>
          <Headset className='w-full h-full p-3' />
        </div>
        <div className='mr-80 ml-4 my-3 p-5 w-full h-full border bg-white rounded-lg'>
          <h1 className='font-bold text-2xl'>Livechat with Customer Service</h1>
          <p>Effortlessly schedule appointments with your preferred healthcare providers at a time that suits you. Our user-friendly system ensures that you can book, reschedule, or cancel appointments with ease, all from the comfort of your home. Say goodbye to long wait times and hello to seamless, convenient scheduling.</p>
          <Link href={"/dashboard/user"}><Button className="mt-2 w-40 rounded-full">Try Now</Button></Link>
        </div>
      </div>
    </>
  )
}

export default features
