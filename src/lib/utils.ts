import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export const DIFFICULTY_COLORS = {
  beginner: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  intermediate: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  advanced: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
};

export const TASK_TYPE_META = {
  tensortonic: { label: "TensorTonic", color: "bg-violet-100 text-violet-700" },
  project: { label: "Build", color: "bg-emerald-100 text-emerald-700" },
  paper: { label: "Paper", color: "bg-amber-100 text-amber-700" },
  study: { label: "Study", color: "bg-sky-100 text-sky-700" },
  ship: { label: "Ship", color: "bg-rose-100 text-rose-700" },
  buffer: { label: "Buffer", color: "bg-gray-100 text-gray-600" },
};
