import Icon from "@component/icon/Icon";
import IconButton from "@component/icon/IconButton";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

interface HeaderRightProps {}

const HeaderRight: React.FC<HeaderRightProps> = () => {
  const session = useSession();
  const [showDataAccessButton, setShowDataAccessButton] = useState(false);
  const [showDataDeletionButton, setShowDataDeletionButton] = useState(false);

  const handleProfileClick = () => {
    setShowDataAccessButton(!showDataAccessButton);
    setShowDataDeletionButton(!showDataDeletionButton);
  }

  const handleDataDeletionClick = () => {
    const userEmail = session?.data?.user?.email || "";
    if (userEmail == "") return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userEmail}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          console.error("Error deleting data");
          return;
        }
        signOut();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleDataAccessClick = () => {
    const userEmail = session?.data?.user?.email || "";
    if (userEmail == "") return;
    
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/privacy/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          console.error("Error fetching data");
          return;
        }

        const blob = new Blob([data.data], { type: "application/json" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `dataAccessResult.json`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <IconButton
        rounded
        className="hidden md:inline-flex h-10 w-20 ml-5 md:ml-20 "
      >
        <Icon name="apps" size="3xl" color="gray" />
      </IconButton>

      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session?.data?.user?.image || ""}
        onClick={handleProfileClick}
        alt="avatar"
      />

      {showDataAccessButton && 
        <IconButton
          rounded
          className="hidden md:inline-flex h-20 w-50 ml-20 md:ml-10" // Increased ml-15 to ml-20 and md:ml-5 to md:ml-10
          onClick={handleDataAccessClick}
        >
          Personal Data
        </IconButton>
      }

      {showDataDeletionButton && 
        <IconButton
          rounded
          className="hidden md:inline-flex h-20 w-50 ml-20 md:ml-10" // Increased ml-15 to ml-20 and md:ml-5 to md:ml-10
          onClick={handleDataDeletionClick}
        >
          Delete Account
        </IconButton>
      }


      {showDataAccessButton &&
        <IconButton
          rounded
          className="hidden md:inline-flex h-20 w-50 ml-15 md:ml-5 "
          onClick={() => signOut()}
        >
          Sign Out
        </IconButton>
      }
    </>
  );
};

export default HeaderRight;
