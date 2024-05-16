import useAppState from "@/app/_contexts/globalContext";

const HamburgerMenu = () => {
  const { isMenuButtonPressed, setIsMenuButtonPressed } = useAppState();

  return (
    <button
      onClick={() => {
        setIsMenuButtonPressed(!isMenuButtonPressed);
      }}
    >
      <div>
        <div className="p-1/2">
          <svg
            className="w-8 h-8 text-gray-900"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
      </div>
    </button>
  );
};

export default HamburgerMenu;
