import bullsEye from "../assets/Emojis/bulls-eye.webp";
import thumbsUp from "../assets/Emojis/thumbs-up.webp";
import meh from "../assets/Emojis/meh.webp";

interface Props {
  rating: number;
}

const emojiMap: {
  [key: number]: { src: string; alt: string; sizeClass: string };
} = {
  3: { src: meh, alt: "meh", sizeClass: "h-6 w-6" },
  4: { src: thumbsUp, alt: "recommended", sizeClass: "h-6 w-6" },
  5: { src: bullsEye, alt: "exceptional", sizeClass: "h-8 w-8" },
};

const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;
  const emoji = emojiMap[rating];
  return <img src={emoji.src} alt={emoji.alt} className={`mt-1 ${emoji.sizeClass}`} />;
};

export default Emoji;
