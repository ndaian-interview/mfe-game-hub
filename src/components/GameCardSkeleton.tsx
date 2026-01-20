import React from "react";

const GameCardSkeleton = () => {
  //   console.log(`GameCardSkeleton`);
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-slate-100 shadow-sm dark:bg-slate-800 animate-pulse">
      <div className="h-52 w-full bg-slate-200 dark:bg-slate-700" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default GameCardSkeleton;
