import { redirect } from "next/navigation";
import { db } from "@/app/db";

async function getTicket(ticket_id: string) {
  return db.query.Ticket.findFirst({
    where: (tickets, { eq }) => eq(tickets.ticket_id, ticket_id),
  });
}

const TicketModule: React.FC<{ ticket_id: string }> = async ({ ticket_id }) => {
  let ticket;
  try {
    ticket = await getTicket(ticket_id);
    if (ticket?.status == "closed") redirect("/");
  } catch (error) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-semibold pb-5">Ticket information</h1>
        <h1 className="text-4xl">Name: {ticket?.name}</h1>
        <h1 className="text-4xl">Location: {ticket?.location}</h1>
        <h1 className="text-4xl">Status: {ticket?.status}</h1>
        <h1 className="text-4xl">
          Issue description: {ticket?.issue_description}
        </h1>
        <h1 className="text-4xl">Priority: {ticket?.priority}</h1>
      </div>
    </main>
  );
};

export default TicketModule;
