import { createTicket } from "./utils/createTicket";

export default async function LandingPageModule() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-5 p-24">
      <h1 className="text-5xl font-semibold text-center">
        Create a new ticket
      </h1>
      <form
        action={createTicket}
        className="shadow-md w-2/3 rounded px-8 py-8 flex flex-col gap-5"
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
      </form>
    </main>
  );
}
