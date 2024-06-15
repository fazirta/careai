"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/db";
import { User } from "@clerk/backend";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Ticket } from "@/app/db/schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { SideNavbar } from "./module-elements/SideNavbar";

async function takeTicket(
  router: AppRouterInstance,
  ticket_id: string,
  user_id: string
) {
  try {
    await db
      .update(Ticket)
      .set({ assigned_agent_id: user_id })
      .where(eq(Ticket.ticket_id, ticket_id));

    router.push(`/dashboard/ticket/${ticket_id}`);
  } catch (error) {
    console.error("Error taking ticket:", error);
    throw error;
  }
}

export const DashboardModule: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [openTickets, setOpenTickets] = useState<(typeof Ticket)[]>([]);
  const [assignedTickets, setAssignedTickets] = useState<(typeof Ticket)[]>([]);

  useEffect(() => {
    async function fetchTicketsAndCount() {
      const tickets = await db.query.Ticket.findMany();
      const openTickets = tickets.filter(
        (ticket) =>
          ticket.status === "open" && ticket.assigned_agent_id !== user.id
      );
      const assignedTicket = tickets.filter(
        (ticket) => ticket.assigned_agent_id === user.id
      );

      setOpenTickets(openTickets);
      setAssignedTickets(assignedTicket);
    }

    fetchTicketsAndCount();
  }, []);

  return (
    <div className="w-screen h-screen pt-10 flex justify-between gap-10 items-center px-4">
      <SideNavbar />
      <div className="w-[75%] h-full">
        <div className="flex gap-8">
          <div className="p-5 bg-[#80ED99] rounded-2xl text-white shadow-lg">
            <h1 className="text-3xl font-semibold">{openTickets.length}</h1>
            <h2 className="text-xl font-semibold">Open Tickets</h2>
          </div>
          <div className="p-5 bg-[#80ED99] rounded-2xl text-white shadow-lg">
            <h1 className="text-3xl font-semibold">{assignedTickets.length}</h1>
            <h2 className="text-xl font-semibold">Assigned to me</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 pt-20">
          {openTickets.length > 0 ? (
            <div className="flex flex-col gap-5 bg-slate-100 p-8 rounded-2xl">
              <h1 className="text-2xl font-semibold">Open Tickets</h1>
              <ul className="flex flex-col gap-5">
                {openTickets.map((ticket) => (
                  <li
                    key={ticket.ticket_id}
                    className="bg-[#22577A] rounded-2xl p-4 text-white flex justify-center items-center gap-16"
                  >
                    <div className="flex justify-center items-center gap-5">
                      <div className="bg-slate-400 rounded-full w-12 h-12"></div>
                      <h2 className="text-lg font-semibold">{ticket.name}</h2>
                    </div>
                    <h2 className="text-lg font-semibold">{ticket.location}</h2>
                    <button
                      onClick={() =>
                        takeTicket(router, ticket.ticket_id, user.id)
                      }
                      className="text-lg mt-2 px-8 py-2 bg-[#57CC99] text-white font-semibold rounded-2xl"
                    >
                      Take
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
          {assignedTickets.length > 0 ? (
            <div className="flex flex-col gap-5 bg-slate-100 p-8 rounded-2xl">
              <h1 className="text-2xl font-semibold">Assigned Tickets</h1>
              <ul className="flex flex-col gap-5">
                {assignedTickets.map((ticket) => (
                  <li
                    key={ticket.ticket_id}
                    className="bg-[#22577A] rounded-2xl p-4 text-white flex justify-center items-center gap-16"
                  >
                    <div className="flex justify-center items-center gap-5">
                      <div className="bg-slate-400 rounded-full w-12 h-12"></div>
                      <h2 className="text-lg font-semibold">{ticket.name}</h2>
                    </div>
                    <h2 className="text-lg font-semibold">{ticket.location}</h2>
                    <button
                      onClick={() =>
                        takeTicket(router, ticket.ticket_id, user.id)
                      }
                      className="text-lg mt-2 px-8 py-2 bg-[#57CC99] text-white font-semibold rounded-2xl"
                    >
                      Open
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
