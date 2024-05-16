import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

interface HomePageIconProps {
  size?: string;
  color?: string;
}

const HomePageIcon: React.FC<HomePageIconProps> = ({
  size = "1x",
  color = "black",
}) => {
  return <FontAwesomeIcon icon={faHome} style={{ fontSize: size, color }} />;
};

export default HomePageIcon;
