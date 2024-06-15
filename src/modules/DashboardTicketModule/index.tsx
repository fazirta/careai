import { db } from "@/app/db";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

async function getTicket(ticketId: string) {
  return await db.query.Ticket.findFirst({
    where: (tickets, { eq }) => eq(tickets.ticket_id, ticketId),
  });
}

export const DashboardTicketModule: React.FC<{ ticketId: string }> = async ({
  ticketId,
}) => {
  const ticket = await getTicket(ticketId);

  return (
    <main className="h-screen max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col gap-5 h-full justify-center w-full">
        <div className="flex">
          <Link href={"/dashboard/agent"}>
            <div className="bg-[#57CC99] px-5 py-3 text-white font-semibold rounded-2xl flex gap-2 hover:shadow-2xl hover:bg-green-500">
              <ArrowLeftIcon /> Back
            </div>
          </Link>
        </div>
        <div className="bg-[#22577A] p-5 rounded-2xl">
          <h1 className="text-2xl font-semibold text-white pb-2">
            Customer Information
          </h1>
          <h1 className="text-lg font-medium text-white">
            Name: {ticket?.name}
          </h1>
          <h1 className="text-lg font-medium text-white">
            Email: {ticket?.email}
          </h1>
          <h1 className="text-lg font-medium text-white">
            Location: {ticket?.location}
          </h1>
        </div>
        <div className="flex gap-5">
          <div className="bg-[#22577A] p-5 rounded-2xl">
            <h1 className="text-2xl font-semibold text-white pb-2">
              Ticket Priority
            </h1>
            <h1 className="text-lg font-medium text-white">
              {ticket?.priority}
            </h1>
          </div>
          <div className="bg-[#22577A] p-5 rounded-2xl">
            <h1 className="text-2xl font-semibold text-white pb-2">
              User Sentiment
            </h1>
            <h1 className="text-lg font-medium text-white">
              {ticket?.sentiment}
            </h1>
          </div>
          <div className="bg-[#38A3A5] p-5 rounded-2xl">
            <h1 className="text-2xl font-semibold text-white pb-2">
              Issue Description
            </h1>
            <h1 className="text-lg font-medium text-white">
              {ticket?.issue_description}
            </h1>
          </div>
        </div>
        <div className="bg-[#57CC99] p-5 rounded-2xl">
          <h1 className="text-2xl font-semibold text-white pb-2">
            AI Summary ✨
          </h1>
          <h1 className="text-lg font-medium text-white">
            {ticket?.issue_summary}
          </h1>
        </div>
      </div>
    </main>
  );
};
