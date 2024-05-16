import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface CourseCreationIconProps {
  size?: string;
  color?: string;
  marginLeft?: string;
}

const CourseCreationIcon: React.FC<CourseCreationIconProps> = ({
  size = "1x",
  color = "black",
}) => {
  return <FontAwesomeIcon icon={faPlus} style={{ fontSize: size, color }} />;
};

export default CourseCreationIcon;
