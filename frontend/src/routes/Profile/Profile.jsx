import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Input,
  SkeletonCircle,
  SkeletonText,
  IconButton,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserAvatar from "../../components/UserAvatar";
import { UserContext } from "../../components/UserContext";
import Signout from "../../components/Signout";

export default function Profile() {
  const { userData, loading } = useContext(UserContext);
  const [hidden, setHidden] = useState(true);
  const [newNameInput, setNewNameInput] = useState("");
  const [editNameClick, setEditNameClick] = useState(false);
  const [editProfileClick, setEditProfileClick] = useState(false);

  const handleEditNameClick = () => {
    setEditNameClick(true);
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setNewNameInput(input);
  };
  const handleEditProfileClick = () => {};
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
              <Link to="/home">
                <ArrowBackIcon boxSize={20} />
              </Link>
              <div className="flex flex-col justify-center items-center gap-5">
                <div
                  onMouseEnter={() => setHidden(false)}
                  onMouseLeave={() => setHidden(true)}
                  className="relative hover:opacity-50"
                >
                  {hidden ? null : (
                    <h1 className="bg-opacity-100 text-center font-bold text-black absolute top-1/2 right-1/2 -translate-y-2/4 translate-x-2/4 z-20">
                      Change Profile{" "}
                    </h1>
                  )}
                  <UserAvatar size={"xl"} />
                </div>
                <div className="relative">
                  <>
                    {editNameClick ? (
                      <Input
                        value={newNameInput}
                        onChange={(e) => handleChange(e)}
                      />
                    ) : (
                      <p className="font-bold text-center text-5xl">
                        {userData.current_user.name}
                      </p>
                    )}
                  </>
                </div>
                <p>{userData.current_user.email}</p>
                <div className="flex gap-5">
                  {
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => handleEditNameClick()}
                    >
                      Edit
                    </IconButton>
                  }
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
