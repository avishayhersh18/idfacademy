import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface ExitIconProps {
  size?: string;
  color?: string;
  marginLeft?: string;
}

const ExitIcon: React.FC<ExitIconProps> = ({
  size = "1x",
  color = "black",
  marginLeft = "0",
}) => {
  return (
    <FontAwesomeIcon
      icon={faSignOutAlt}
      style={{ fontSize: size, color, marginLeft }}
    />
  );
};

export default ExitIcon;
