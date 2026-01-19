import { Game, Platform } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";

interface Props {
  game: Game;
}

const GameCard = (props: Props) => {
  const { game } = props;
  return (
    <article className="flex h-full flex-col">
      <img src={getCroppedImageUrl(game.background_image)} alt={game.name} className="h-52 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <PlatformIconList platforms={game.parent_platforms.map(({ platform }) => platform)} />
          <CriticScore score={game.metacritic} />
        </div>
        <h2 className="flex items-center gap-2 text-lg font-semibold leading-snug">
          <span>{game.name}</span>
          <Emoji rating={game.rating_top} />
        </h2>
      </div>
    </article>
  );
};

export default GameCard;
