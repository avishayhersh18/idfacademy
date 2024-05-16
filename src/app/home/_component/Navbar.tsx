"use client"
import HamburgerMenu from "../../assets/icons/HamburgerMenu";
import { HomeTexts,NavBarText } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import tikshuvPicture from "@/app/assets/tikshuv.png";
import { Users } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContinueStudyingIcon from "@/app/assets/icons/ContinueStudyingIcon"

import AvatarImg from "@/app/assets/profile.png"
import {
  admin_menu,
  user_menu,
  creator_menu,
  editor_menu,
  MenuRow,
} from "../menus";
import { useEffect, useState } from "react";
import RowInMenu from "./RowInMenu";
import { Avatar, Button, Link } from "react-daisyui";

interface NavbarProps {
  userType: Users;
}

const Navbar: React.FC<NavbarProps> = ({ userType }) => {
  const {initialUserType,setInitialUserType, isMenuButtonPressed,isSmallScreen,isAdminMenu,setIsAdminMenu,onClickChangePremmisionMenu,menu,setMenu } = useAppState();

  const router=useRouter()
  useEffect(() => {
  
    setMenu(initialUserType)
  }, []); 

 return (
  <nav className="flex justify-between items-center w-full py-5 ">
    <div className="flex items-center mx-3">
      <a href="/home" className="text-slate-900 text-4xl font-leagueGothic">
        <span>IDF</span>
        <span className="text-emerald-700">A</span>
      </a>
    </div>
    {!isSmallScreen && (
  <div className="flex justify-center mx-4 gap-10 items-center flex-grow">
    {menu.slice().reverse().map(({ id, href, rowInfo, icon }) => {
      return <RowInMenu href={href} rowInfo={rowInfo} icon={icon} isSideBar={false} key={id} />;
    })}
  </div>
)}

    <div className="min-w-fit ml-auto">
      <a onClick={() => router.push("/home/userArea")}>
        <Avatar className="w-12 h-12 rounded-full overflow-hidden" src={AvatarImg.src} />
        <span className="text-sm">לאיזור אישי</span>
      </a>
    </div>

    <div className="flex items-center ">
      {initialUserType && (
        <div className="mx-2">
        <Button onClick={()=>onClickChangePremmisionMenu(isAdminMenu)}>
          {isAdminMenu ? NavBarText.backToUserMenu : NavBarText.AdminMenu}
        </Button>
        </div>
      )}
      <div className="flex-shrink-0">
        <button className="btn bg-emerald-700 hover:bg-emerald-800 text-sm text-white px-5 rounded-md font-assistant">
          <RowInMenu href={"/home/myCourses"} rowInfo={NavBarText.myCourses} icon={<ContinueStudyingIcon />} isSideBar={false} />
        </button>
      </div>
      {isSmallScreen && <HamburgerMenu />}
    </div>
  </nav>
);

};

export default Navbar;
