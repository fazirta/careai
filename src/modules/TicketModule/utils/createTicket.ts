"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ticket } from "@/app/db/schema";
import { db } from "@/app/db";

export async function createTicket(formData: FormData) {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string).toLowerCase();
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

  const chatResultSummary = await chatSession?.sendMessage(
    `I'm customer service. Please help me create a summary for issue description: [${issueDescription}]. Write the answer in the form of a concise text and according to the language used in the description of the issue.`
  );

  const issue_summary = chatResultSummary?.response.text().toLowerCase();

  const chatResultPriority = await chatSession?.sendMessage(
    `I'm customer service on CareAI which is an AI-based system to make it easier for hospitals to manage administrative matters/medical records and assist the help center through chatbots which can provide summaries, recommendations and serve patients in various language options to make it easier for CS to process existing messages. Apart from that, CareAI can also analyze patient satisfaction sentiment with the services provided. Please identify ticket priority for: ${issueDescription}. Answer only in: ["low", "medium", "high"]`
  );

  const user_sentiment = await chatSession?.sendMessage(
    `I'm customer service on CareAI which is an AI-based system to make it easier for hospitals to manage administrative matters/medical records and assist the help center through chatbots which can provide summaries, recommendations and serve patients in various language options to make it easier for CS to process existing messages. Apart from that, CareAI can also analyze patient satisfaction sentiment with the services provided. here's the description provided by customer: ${issueDescription}. analyze how user sentiment is implicit in the delivery of their input, describe it in one word`
  );

  const sentiment = user_sentiment?.response.text().toLowerCase();

  const priority = chatResultPriority?.response.text().toLowerCase() as
    | "low"
    | "medium"
    | "high";

  await db.insert(Ticket).values({
    name,
    email,
    location,
    issue_description: issueDescription,
    priority,
    issue_summary,
    sentiment,
  });
}
