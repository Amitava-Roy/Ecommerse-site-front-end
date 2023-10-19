import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function Button({
  children,
  btn,
  link,
  isDetails,
  onClick,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (link) {
      return;
    }
    onClick();
  };

  return (
    <>
      {!link && (
        <button onClick={handleClick}>{children}</button>
      )}
      {link && <Link to={link}>{children}</Link>}
    </>
  );
}

export default Button;
