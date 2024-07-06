import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Input,
  SkeletonCircle,
  SkeletonText,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserAvatar from "../../components/UserAvatar";
import { UserContext } from "../../components/UserContext";
import Signout from "../../components/Signout";

function LoadingScreen() {
  return (
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
  );
}
function ChangeAvatarSection({ hidden, setHidden }) {
  return (
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
  );
}
export default function Profile() {
  const { userData, loading } = useContext(UserContext);
  const [hidden, setHidden] = useState(true);
  const [newNameInput, setNewNameInput] = useState("");
  const [editNameClick, setEditNameClick] = useState(false);
  const [editAvatarClick, setEditAvatarClick] = useState(false);

  const updateData = async (newInfo) => {
    const body = { name: newInfo.name };
    const url = `http://localhost:3000/api/v1/users/${userData.current_user.id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
  };
  const handleEditNameClick = () => {
    setEditNameClick(true);
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setNewNameInput(input);
  };
  const handleOnSaveClick = () => {
    if (newNameInput) {
      updateData({ name: newNameInput, avatar: null });
      setEditNameClick(false);
    } else {
      return;
    }
  };
  const handleEditAvatarClick = () => {};
  return (
    <div className="py-5 flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gradient-top to-gradient-bot">
      <div className="p-5 gap-x-5 gap-y-3 grid grid-cols-12 grid-rows-12 w-11/12 bg-gradient-to-b from-gradient-box-top to-gradient-box-bot self-center min-h-96 max-h-full bg-black rounded-xl">
        <div className="col-span-12 row-span-12 rounded-xl md:row-span-9 md:col-span-12 md:row-start-2 md:col-start-1 lg:col-start-5 lg:row-span-12 lg:row-start-1 bg-white min-h-[500px] overflow-y-auto">
          {loading ? (
            <>
              <LoadingScreen />
            </>
          ) : (
            <>
              <Link to="/home">
                <ArrowBackIcon boxSize={20} />
              </Link>
              <div className="flex flex-col justify-center items-center gap-5">
                <ChangeAvatarSection hidden={hidden} setHidden={setHidden} />
                <div className="relative">
                  <>
                    {editNameClick ? (
                      <div className="flex items-center gap-5">
                        <label htmlFor="editName">Username:</label>
                        <Input
                          id="editName"
                          value={newNameInput}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    ) : (
                      <p className="font-bold text-center text-5xl">
                        {userData.current_user.name}
                      </p>
                    )}
                  </>
                </div>
                <p>{userData.current_user.email}</p>
                <div className="flex gap-5">
                  {editNameClick ? (
                    <Button
                      _hover={{ bg: "#4b4bef" }}
                      bg={"#7A7AF3"}
                      color={"white"}
                      onClick={() => {
                        handleOnSaveClick();
                      }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      rightIcon={<EditIcon />}
                      _hover={{ bg: "#4b4bef" }}
                      bg={"#7A7AF3"}
                      color={"white"}
                      onClick={() => handleEditNameClick()}
                    >
                      Edit
                    </Button>
                  )}
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
