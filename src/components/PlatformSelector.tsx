import { BsChevronDown } from "react-icons/bs";
import usePlatforms, { Platform } from "../hooks/usePlatforms";

interface Props {
  selectedPlatform: Platform | null;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: Props) => {
  const { data, error } = usePlatforms();

  if (error) return null;

  return (
    <div className="inline-flex items-center gap-2">
      <label className="text-sm text-slate-600 dark:text-slate-300">Platform</label>
      <div className="relative">
        <select
          className="appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 pr-8 text-sm text-slate-900 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          value={selectedPlatform?.id ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            const platform = data.find((p) => p.id === Number(value));
            if (platform) onSelectPlatform(platform);
          }}
        >
          <option value="">Platforms</option>
          {data.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
        <BsChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
      </div>
    </div>
  );
};

export default PlatformSelector;
