"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { redirect } from "next/navigation";
import { Ticket } from "@/app/db/schema";
import { db } from "@/app/db";

export async function createTicket(formData: FormData) {
  const name = formData.get("name") as string;
  const location = formData.get("location") as string;
  const issueDescription = formData.get("issue_description") as string;

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
  );

  const chatSession = genAI
    .getGenerativeModel({ model: "gemini-1.5-flash-latest" })
    .startChat({
      generationConfig: {
        maxOutputTokens: 400,
      },
    });

  const chatResult = await chatSession?.sendMessage(
    `I'm customer service on careAI which is an AI-based system to make it easier for hospitals to manage administrative matters/medical records and assist the help center through chatbots which can provide summaries, recommendations and serve patients in various language options to make it easier for CS to process existing messages. Apart from that, CareAI can also analyze patient satisfaction sentiment with the services provided. Please identify ticket priority for: ${issueDescription}. Answer only: low, medium, or high.`
  );

  const response = chatResult?.response;
  const priority = response?.text().toLowerCase() as "low" | "medium" | "high";

  const insertedTicket = await db
    .insert(Ticket)
    .values({
      name,
      location,
      issue_description: issueDescription,
      priority,
    })
    .returning({
      ticket_id: Ticket.ticket_id,
    });

  const { ticket_id } = insertedTicket[0];
  redirect(`ticket/${ticket_id}`);
}
