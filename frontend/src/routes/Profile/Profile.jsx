import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useContext } from "react";

import UserAvatar from "../../components/UserAvatar";
import { UserContext } from "../../components/UserContext";
import Signout from "../../components/Signout";

export default function Profile() {
  const { userData, loading } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="py-5 flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-top to-gradient-bot">
      <div className="p-5 gap-x-5 gap-y-3 grid grid-cols-12 grid-rows-12 w-11/12 bg-gradient-to-b from-gradient-box-top to-gradient-box-bot self-center min-h-96 max-h-full bg-black rounded-xl">
        <div className="col-span-12 row-span-12 rounded-xl md:row-span-9 md:col-span-12 md:row-start-2 md:col-start-1 lg:col-start-5 lg:row-span-12 lg:row-start-1 bg-white min-h-[500px] overflow-y-auto">
          {loading ? (
            <>
              <div className="flex mt-5 justify-center">
                <SkeletonCircle size="40" />
              </div>
              <SkeletonText
                className="text-center mt-4 p-5"
                noOfLines={4}
                spacing="10"
                skeletonHeight="5"
              />
            </>
          ) : (
            <>
              <ArrowBackIcon boxSize={20} onClick={() => navigate(-1)} />
              <div className="flex flex-col justify-center items-center gap-5">
                <UserAvatar size={"xl"} />
                <p className="font-bold text-center text-5xl">
                  {userData.current_user.name}
                </p>
                <p>{userData.current_user.email}</p>
                <div>
                  <Signout />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
