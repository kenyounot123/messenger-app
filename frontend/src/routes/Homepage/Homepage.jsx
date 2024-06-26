import Sidebar from "../../components/Sidebar";

export default function Homepage() {
  return (
    <div className="py-5 flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-black to-gradient-grey">
      <div className="gap-x-5 gap-y-3 grid grid-cols-12 grid-rows-12 w-11/12 bg-gradient-to-b from-gradient-box-grey to-gradient-box-white self-center bg-black rounded-xl min-h-full">
        <div className="ml-5 row-span-12 my-5 rounded-xl bg-messenger-blue">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-3 mt-5 rounded-xl bg-white">2</div>
        <div className="row-span-11 col-start-2 col-span-3 mb-5 rounded-xl bg-white">
          3
        </div>
        <div className="rounded-xl row-span-12 col-span-8 mr-5 row-start-1 col-start-5 my-5 bg-white">
          4
        </div>
      </div>
    </div>
  );
}
