import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface AboutUsIconProps {
  size?: string;
  color?: string;
  marginLeft?: string;
}

const AboutUsIcon: React.FC<AboutUsIconProps> = ({
  size = "1x",
  color = "black",
  marginLeft = "0",
}) => {
  return (
    <FontAwesomeIcon
      icon={faInfoCircle}
      style={{ fontSize: size, color, marginLeft }}
    />
  );
};

export default AboutUsIcon;
