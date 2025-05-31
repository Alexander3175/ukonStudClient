import { ICategories } from "../../../stores/profileStore";

interface GameCardProps {
  id: string | number;
  title: string;
  image: string;
  isSteam: boolean;
  playTime?: {
    playtime_forever: number;
    playtime_2weeks: number;
  };
  category: keyof ICategories | undefined;
  onCategoryChange: (newCategory: keyof ICategories | undefined) => void;
  onClick: (id: number | string) => void;
}

export const GameCard = ({
  id,
  title,
  image,
  onClick,
  playTime,
  category,
  onCategoryChange,
  isSteam,
}: GameCardProps) => (
  <section>
    <button className="relative w-72 overflow-hidden bg-transparent rounded-lg shadow-2xl border-none transform hover:scale-105 transition-all duration-300 group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover"
        onClick={() => !isSteam && onClick(id)}
      />

      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-lg font-semibold p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        {title}
        {isSteam && playTime && (
          <div className="text-sm font-light mt-1">
            <p>Загалом: {Math.round(playTime.playtime_forever / 60)} год</p>
            {playTime.playtime_2weeks > 0 && (
              <p>За 2 тижні: {Math.round(playTime.playtime_2weeks / 60)} год</p>
            )}
          </div>
        )}
      </div>
    </button>

    <div>
      {!isSteam && (
        <select
          value={category ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onCategoryChange(
              val === "" ? undefined : (val as keyof ICategories)
            );
          }}
          className="mt-2 w-full"
        >
          <option value="">Без категорії</option>
          <option value="Want">Want</option>
          <option value="Playing">Playing</option>
          <option value="Beaten">Beaten</option>
          <option value="Archived">Archived</option>
        </select>
      )}
    </div>
  </section>
);
