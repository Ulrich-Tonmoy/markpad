import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const dateFormatter = new Intl.DateTimeFormat(
  Intl.DateTimeFormat().resolvedOptions().locale,
  {
    dateStyle: "short",
    timeStyle: "short",
  },
);

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms);

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

export const setTheme = (theme: string) => {
  document.documentElement.setAttribute("data-theme", theme);
};
