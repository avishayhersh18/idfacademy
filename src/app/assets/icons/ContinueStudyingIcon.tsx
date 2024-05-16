import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

interface ContinueStudyingIconProps {
  size?: string;
  color?: string;
  marginLeft?: string;
}

const ContinueStudyingIcon: React.FC<ContinueStudyingIconProps> = ({
  size = "1x",
  color = "black",
  marginLeft = "0",
}) => {
  return (
    <FontAwesomeIcon
      icon={faGraduationCap}
      style={{ fontSize: size, color, marginLeft }}
    />
  );
};

export default ContinueStudyingIcon;
