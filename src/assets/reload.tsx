// import React from "react";
import type { SVGProps } from "react";

export function ReloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        color="currentColor"
      >
        <path d="M20.5 5.5h-11C5.787 5.5 3 8.185 3 12m.5 6.5h11c3.713 0 6.5-2.685 6.5-6.5"></path>
        <path d="M18.5 3S21 4.841 21 5.5S18.5 8 18.5 8m-13 8S3 17.841 3 18.5S5.5 21 5.5 21"></path>
      </g>
    </svg>
  );
}
