import React from "react";
import logo from "../assets/Logo/logo.webp";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <nav className="flex w-full items-center gap-4 px-4 py-3 lg:px-6">
      <img src={logo} alt="Game Hub Logo" className="h-12 w-12 flex-shrink-0 rounded-md" />
      <div className="flex-1">
        <SearchInput onSearch={onSearch} />
      </div>
    </nav>
  );
};

export default NavBar;
