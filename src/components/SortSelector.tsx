import React from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  sortOrder: string;
  onSelectSortOrder: (sortOrder: string) => void;
}

const SortSelector = ({ sortOrder, onSelectSortOrder }: Props) => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const currentSortOrder = sortOrders.find((order) => order.value === sortOrder);

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-slate-600 dark:text-slate-300">Order by:</span>
      <div className="relative">
        <select
          className="appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 pr-8 text-sm text-slate-900 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          value={sortOrder}
          onChange={(event) => onSelectSortOrder(event.target.value)}
        >
          {sortOrders.map((order) => (
            <option key={order.value} value={order.value}>
              {order.label}
            </option>
          ))}
        </select>
        <BsChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
      </div>
    </div>
  );
};

export default SortSelector;
