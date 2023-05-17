import React from "react";

function CommentIcon({ stroke }) {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.1665 24.5734H17.8332L11.8998 28.52C11.0198 29.1067 9.83317 28.4801 9.83317 27.4134V24.5734C5.83317 24.5734 3.1665 21.9067 3.1665 17.9067V9.90666C3.1665 5.90666 5.83317 3.23999 9.83317 3.23999H23.1665C27.1665 3.23999 29.8332 5.90666 29.8332 9.90666V17.9067C29.8332 21.9067 27.1665 24.5734 23.1665 24.5734Z"
        stroke={`${stroke}`}
        stroke-width="2.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CommentIcon;
