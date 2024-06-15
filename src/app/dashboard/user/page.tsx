import React from 'react'
import AddNewChatSession from './_components/AddNewChatSession'
import ImgAnalisa from './_components/ImgAnalisa'

export default function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className="font-bold text-2xl">Welcome..</h2>
      <h2 className='text-gray-500'>Start Your Personal AI Assistant</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5 p-10 items-center justify-center'>
        <AddNewChatSession/> 
        <ImgAnalisa/>
      </div>
    </div>
  )
}
