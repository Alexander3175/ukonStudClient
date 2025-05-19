interface GameCardProps {
  id: string | number;
  title: string;
  image: string;
  isSteam: boolean;
  onClick: (id: string | number) => void;
}

export const GameCard = ({
  id,
  title,
  image,
  onClick,
  isSteam,
}: GameCardProps) => (
  <button
    onClick={() => {
      if (isSteam) return;
      onClick(id);
    }}
    className="relative w-72 overflow-hidden bg-transparent rounded-lg shadow-2xl border-none transform hover:scale-105 transition-all duration-300 group cursor-pointer"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-72 object-cover transition-opacity duration-300 opacity-100"
    />
    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-lg font-semibold p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      {title}
    </div>
  </button>
);
