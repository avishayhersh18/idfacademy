import create from 'zustand';
import { useEffect, useState } from 'react';
import { Theme, lightTheme } from '../theme'; // Adjust import paths as necessary
import { Users } from '@/app/types';
import { MenuRow, admin_menu, user_menu } from '@/app/home/menus'; // Adjust import paths as necessary

// Define your AppState and AppActions types as before
type AppState = {
  isMenuButtonPressed: boolean;
  // theme: Theme;
  isSmallScreen: boolean;
  isAdminMenu: boolean;
  menu: MenuRow[]; // Assuming MenuRow is correctly defined elsewhere
  initialUserType: Users;
};

type AppActions = {
  setInitialUserType: (value: number) => void;
  setIsMenuButtonPressed: (value: boolean) => void;
  // setTheme: (value: Theme) => void;
  setIsSmallScreen: (value: boolean) => void;
  setIsAdminMenu: (value: boolean) => void;
  setMenu: (userType: number) => void;
  onClickChangePremmisionMenu: (value: boolean) => void;
};

const useAppState = create<AppState & AppActions>((set, get) => ({
  // Initial state
  isMenuButtonPressed: false,
  // theme: lightTheme,
  isSmallScreen: false, // Initialized as false, will be set correctly in useEffect
  isAdminMenu: false,
  menu: [],
  initialUserType: Users.User,

  // Actions
  setInitialUserType: (value) => set({ initialUserType: value }),
  setIsMenuButtonPressed: (value) => set({ isMenuButtonPressed: value }),
  // setTheme: (value) => set({ theme: value }),
  setIsSmallScreen: (value) => set({ isSmallScreen: value }),
  setIsAdminMenu: (value) => set({ isAdminMenu: value }),
  setMenu: (userType) => {
    let menu:MenuRow[];
    switch (userType) {
      case Users.Admin:
        menu = admin_menu;
        break;
      case Users.User:
        menu = user_menu;
        break;
      // Handle other cases as needed
      default:
        menu = [];
    }
    set({ menu, isAdminMenu: userType === Users.Admin });
  },
  onClickChangePremmisionMenu: (value) => {
    const boolIsAdminMenu = !value;
    const userType = boolIsAdminMenu ? Users.Admin : Users.User;
    const menu = userType === Users.Admin ? admin_menu : user_menu;
    set({ menu, isAdminMenu: boolIsAdminMenu });
  },
}));

// A component or hook to set isSmallScreen based on window size
export function useWindowSizeListener() {
  const setIsSmallScreen = useAppState((state) => state.setIsSmallScreen);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 786);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSmallScreen]); // Empty array means this effect runs only once on mount
}
export default useAppState;
// Remember to call useWindowSizeListener() in your top-level component or in specific components where you need accurate isSmallScreen state.
