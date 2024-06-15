"use client";

import TextareaAutosize from "react-textarea-autosize";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import { useEffect, useRef, useState } from "react";

async function getTicket(ticket_id: string) {
  return db.query.Ticket.findFirst({
    where: (tickets, { eq }) => eq(tickets.ticket_id, ticket_id),
  });
}

const TicketModule: React.FC<{ ticket_id: string }> = ({ ticket_id }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const redirectIfUnauthenticated = async () => {
      let ticket;
      try {
        ticket = await getTicket(ticket_id);
        if (ticket?.status == "closed") redirect("/");
      } catch (error) {
        redirect("/");
      }
    };
    redirectIfUnauthenticated;
  });

  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full p-10 flex flex-col justify-end max-w-screen-xl mx-auto">
        <TextareaAutosize
          ref={textareaRef}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter' && !e.shiftKey) {
          //     e.preventDefault()
          //     sendMessage()
          //   }
          // }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter your message here"
          className="text-xl block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 h-min bg-slate-200 rounded-2xl px-5"
        />
      </div>
    </main>
  );
};

export default TicketModule;
