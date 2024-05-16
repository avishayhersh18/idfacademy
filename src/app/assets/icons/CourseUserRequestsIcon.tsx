import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons"; // import the faUsers icon

interface CourseUserRequestsIconProps {
  size?: string;
  color?: string;
}

const CourseUserRequestsIcon: React.FC<CourseUserRequestsIconProps> = ({
  size = "1x",
  color = "black",
}) => {
  return <FontAwesomeIcon icon={faUsers} style={{ fontSize: size, color }} />;
};

export default CourseUserRequestsIcon;
