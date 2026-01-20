import React from "react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  return (
    <span
      className={
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold " +
        (score > 75
          ? "bg-green-500/20 text-green-400"
          : score > 60
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-slate-500/20 text-slate-300")
      }
    >
      {score}
    </span>
  );
};

export default CriticScore;
