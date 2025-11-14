import type { ReactNode } from "react";

const D10_inline = (
  <svg
    width="186"
    height="179"
    viewBox="0 0 186 179"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34 113.5L0 113L2 69L93 0L34 113.5ZM184 69L186 113L152 113.5L93 0L184 69Z"
      fill="#838383"
    />
    <path
      d="M93 179L0 113L34 113.5L93 142L152 113.5L186 113L93 179Z"
      fill="#707070"
    />
    <path d="M152 113.5L93 142L34 113.5L93 0L152 113.5Z" fill="#8C8C8C" />
  </svg>
);
export default function D10(P: { children: ReactNode }) {
  return (
    <div className="D10">
      <span>{P.children}</span>
      {D10_inline}
    </div>
  );
}
