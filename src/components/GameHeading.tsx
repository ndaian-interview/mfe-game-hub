import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.platform?.name || ""} ${gameQuery.genre?.name || ""} Games`;
  return <h1 className="my-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{heading}</h1>;
};

export default GameHeading;
