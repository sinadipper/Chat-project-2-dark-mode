// import React from "react";
import type { SVGProps } from "react";

export function Attachment(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.823 12L4.28 10.456a4.367 4.367 0 1 1 6.177-6.177l9.265 9.265a4.368 4.368 0 0 1-6.177 6.177l-3.474-3.475a2.73 2.73 0 0 1 3.86-3.86l1.93 1.93"
        color="currentColor"
      ></path>
    </svg>
  );
}
