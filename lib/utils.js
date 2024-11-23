import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function getAspectRatio(image) {

  const w = image.naturalWidth;
  const h = image.naturalHeight;

  let aspectRatio;
  let orientation = "landscape";

  if (w > h) {
      aspectRatio = w / h;
  } else {
      aspectRatio = h / w;
      orientation = "portrait";
  }

  return [aspectRatio, orientation];

};