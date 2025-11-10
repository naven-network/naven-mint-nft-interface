import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleImageUri = (uri: string) => {
  if (!uri) return "";

  if (uri.startsWith("ipfs://")) {
    const path = uri.replace("ipfs://", "");

    const parts = path.split("/");
    const cid = parts[0]; // Qm...
    const filePath = parts.slice(1).join("/");

    if (filePath) {
      return `https://${cid}.ipfs.w3s.link/${filePath}`;
    } else {
      return `https://${cid}.ipfs.w3s.link/`;
    }
  }

  return uri;
};
