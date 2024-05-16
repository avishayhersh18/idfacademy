import React, { useEffect, useState } from "react";
import useAppState from "@/app/_contexts/globalContext";
import RowInMenu from "./RowInMenu";
import {
  admin_menu,
  user_menu,
  creator_menu,
  editor_menu,
  MenuRow,
} from "../menus";

import {Users} from "@/app/types"
import { Menu } from "react-daisyui";

interface SidebarProps {
  userType: Users;
}

const Sidebar:React.FC<SidebarProps> = ({ userType }) => {
  const { isMenuButtonPressed,isSmallScreen,isAdminMenu,setIsAdminMenu,onClickChangePremmisionMenu,menu,setMenu } = useAppState();


  const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  useEffect(() => {
    setMenu(userType)
  }, [userType]); 

  return (
    <div className={` p-4 flex flex-col   min-h-screen ${sidebarClass}`}>
      <ul className="space-y-6 ">

        {menu.map(({ id, href, rowInfo, icon }) => {
          return (
            <RowInMenu key={id} href={href} rowInfo={rowInfo} icon={icon} isSideBar={true} />
          );
        })}
      </ul>
      {isMenuButtonPressed && (
        <div className="flex flex-row items-center space-x-4 mb-4">
          <div className="bg-red-300 px-4 py-2 rounded-md text-white">
            <button>back</button>
          </div>
          <div className="bg-green-300 px-4 py-2 rounded-md text-white">
            <button>dark</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
