import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="py-5 flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-top to-gradient-bot">
      <div className="p-5 gap-x-5 gap-y-3 grid grid-cols-12 grid-rows-12 w-11/12 bg-gradient-to-b from-gradient-box-top to-gradient-box-bot self-center min-h-96 max-h-full bg-black rounded-xl">
        <div className="col-span-12 row-span-12 rounded-xl md:row-span-9 md:col-span-12 md:row-start-2 md:col-start-1 lg:col-start-5 lg:row-span-12 lg:row-start-1 bg-white min-h-[500px] overflow-y-auto">
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}