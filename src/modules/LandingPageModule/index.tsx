import Link from "next/link";
import { createTicket } from "./utils/createTicket";
import Header from "./utils/Header";
import { Button } from "@/components/ui/button";

export default async function LandingPageModule() {
  return (
    <>
      {/* <img className="w-screen h-screen bg-cover" src="utils/bg.png" alt="" /> */}
      <Header />
      <img
        className="w-screen h-screen bg-cover fixed top-0 left-0 bg-center -z-10"
        src="bg.png"
        alt=""
      />
      <main className="flex min-h-screen relative z-10 flex-col justify-center items-center gap-5 p-24">
        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl font-semibold text-center text-blue-900">
          Your Personal
        </h1>
        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl mb-5 font-semibold text-center text-blue-900">
          Healthcare Assistant
        </h1>

        <Link href={"/Features"}>
          <Button className="w-40 rounded-full">Try Now</Button>
        </Link>

        <br />
        <br />
        <br />
        <br />
        {/* <form
          action={createTicket}
          className="shadow-md w-2/3 rounded px-8 py-8 mt-10 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg">Name</h2>
            <input
              type="text"
              name="name"
              placeholder="Fazil"
              className="text-center appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg">Location</h2>
            <input
              type="text"
              name="location"
              placeholder="Bandung"
              className="text-center appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg">Issue description</h2>
            <input
              type="text"
              name="issue_description"
              placeholder="Scheduling an appointment"
              className="text-center appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              value={"Submit Ticket"}
              className="w-full h-full bg-[#00E699] cursor-pointer transition-colors hover:bg-[#00e5BF] text-gray-800 font-semibold py-3 px-4 rounded focus:outline-none"
            >
              submit
            </button>
          </div>
        </form> */}
      </main>
    </>
  );
}
