import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface PersonalAreaIconProps {
  size?: string;
  color?: string;
}

const PersonalAreaIcon: React.FC<PersonalAreaIconProps> = ({
  size = "1x",
  color = "black",
}) => {
  return <FontAwesomeIcon icon={faUser} style={{ fontSize: size, color }} />;
};

export default PersonalAreaIcon;
