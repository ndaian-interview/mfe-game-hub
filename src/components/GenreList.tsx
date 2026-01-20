import React from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, error, isLoading } = useGenres();

  if (error) return null;
  if (isLoading)
    return <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />;

  return (
    <div>
      <h2 className="mb-3 text-2xl font-semibold">Genres</h2>
      <ul className="space-y-1">
        {data.map((genre) => (
          <li key={genre.id} className="py-1">
            <button
              type="button"
              onClick={() => onSelectGenre(genre)}
              className="flex w-full items-center gap-3 text-left text-base hover:text-indigo-500 focus:outline-none"
            >
              <img
                src={getCroppedImageUrl(genre.image_background)}
                alt={genre.name}
                className="h-8 w-8 flex-shrink-0 rounded-lg object-cover"
              />
              <span
                className={
                  "whitespace-normal " + (genre.id === selectedGenre?.id ? "font-bold text-indigo-400" : "font-normal")
                }
              >
                {genre.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
