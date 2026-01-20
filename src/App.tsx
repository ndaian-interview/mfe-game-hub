import React, { useState } from "react";
import "./index.css";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/usePlatforms";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block border-r border-slate-200 dark:border-slate-800 px-5 py-4">
          <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} />
        </aside>

        <main className="px-4 py-4 lg:px-6 lg:py-6">
          <div className="pl-0 lg:pl-2">
            <GameHeading gameQuery={gameQuery} />
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div>
                <PlatformSelector
                  selectedPlatform={gameQuery.platform}
                  onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })}
                />
              </div>
              <SortSelector
                sortOrder={gameQuery.sortOrder}
                onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })}
              />
            </div>
          </div>
          <GameGrid gameQuery={gameQuery} />
        </main>
      </div>
    </div>
  );
}

export default App;
