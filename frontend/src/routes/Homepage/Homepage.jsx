import Sidebar from "../../components/Sidebar";

export default function Homepage() {
  return (
    <div className="py-5 flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-black to-gradient-grey">
      <div className="p-5 gap-x-5 gap-y-3 grid grid-cols-12 grid-rows-12 w-11/12 bg-gradient-to-b from-gradient-box-grey to-gradient-box-white self-center min-h-96 max-h-full bg-black rounded-xl">
        <div className="flex justify-center items-center rounded-xl row-start-11 col-start-1 col-span-12 row-span-3 md:row-start-11 md:row-span-2 md:col-start-1 md:col-span-12 lg:col-start-1 lg:col-span-1 lg:row-span-12 bg-messenger-blue">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-12 row-span-2 md:col-start-1 md:row-span-2 md:col-span-3 lg:col-start-2 lg:col-span-3 rounded-xl bg-white">
          2
        </div>
        <div className="col-span-12 row-span-2 md:col-start-1 md:row-span-8 md:col-span-3 lg:col-start-2 lg:col-span-3 lg:row-span-10 rounded-xl bg-white">
          3
        </div>
        <div className="col-span-12 row-span-6 rounded-xl md:row-span-10 md:col-span-9 md:row-start-1 md:col-start-4 lg:col-start-5 lg:row-span-12 lg:row-start-1 bg-white">
          4
        </div>
      </div>
    </div>
  );
}
