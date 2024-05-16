import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

interface CourseCatalogIconProps {
  size?: string;
  color?: string;
}

const CourseCatalogIcon: React.FC<CourseCatalogIconProps> = ({
  size = "1x",
  color = "black",
}) => {
  return (
    <FontAwesomeIcon
      icon={faBook}
      style={{
        fontSize: size,
        color,
      }}
    />
  );
};

export default CourseCatalogIcon;
