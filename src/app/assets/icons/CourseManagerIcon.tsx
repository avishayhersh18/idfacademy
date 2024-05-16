import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";

interface CourseManagerIconProps {
  size?: string;
  color?: string;
}

const CourseManagerIcon: React.FC<CourseManagerIconProps> = ({
  size = "1x",
  color = "black",
}) => {
  return <FontAwesomeIcon icon={faCogs} style={{ fontSize: size, color }} />;
};

export default CourseManagerIcon;
