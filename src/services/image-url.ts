import noImage from "../assets/Image Placeholder/no-image-placeholder.webp";

const getCroppedImageUrl = (url: string): string => {
  if (!url) return noImage;
  const target = "media/";
  const croppedUrl = url.replace(target, `${target}crop/600/400/`);
  return croppedUrl;
};

export default getCroppedImageUrl;
