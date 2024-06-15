"use client";

import Image from "next/image";
import { createTicket } from "./utils/createTicket";
import { toast } from "sonner";

export default async function TicketModule() {
  return (
    <main className="text-[#063555] flex w-screen h-screen flex-col justify-center items-center gap-5 xl:p-24">
      <Image
        src={"/ellipse-1.png"}
        alt="ellipse"
        width={600}
        height={600}
        className="absolute bottom-0 left-0 z-0"
      />
      <Image
        src={"/ellipse-2.png"}
        alt="ellipse"
        width={600}
        height={600}
        className="absolute bottom-0 right-0 z-0"
      />
      <div className="z-10 w-full flex flex-col gap-10 justify-center items-center">
        <h1 className="text-5xl font-bold text-center">Create a New Ticket</h1>
        <form
          action={async (formData: FormData) => {
            await createTicket(formData);
            toast("Successfully submitted your ticket!");
          }}
          className="shadow w-2/3 px-8 py-8 flex flex-col gap-5 bg-slate-50/40 rounded-2xl"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Name</h2>
            <input
              type="text"
              name="name"
              placeholder="Fazil"
              className="bg-white/80 appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Email</h2>
            <input
              type="text"
              name="email"
              placeholder="youremail@company.com"
              className="bg-white/80 appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Location</h2>
            <input
              type="text"
              name="location"
              placeholder="Bandung"
              className="bg-white/80 appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Issue description</h2>
            <textarea
              name="issue_description"
              placeholder="Scheduling an appointment..."
              className="bg-white/80 appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none h-48"
            />
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="rounded-md w-full h-full bg-[#00E699] cursor-pointer transition-colors hover:bg-[#00e5BF] text-gray-800 font-semibold py-3 px-4 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
