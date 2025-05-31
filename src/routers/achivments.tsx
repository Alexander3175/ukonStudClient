import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePostStore } from "../stores/postStore";
import { fetchStats } from "../service/statsService";
import { ISteamGame } from "../types/Game";

interface Achievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
  displayName?: string;
  description?: string;
  icon?: string;
  icongray?: string;
}

export interface GameWithAchievements {
  appid: number;
  name: string;
  achievements: Achievement[];
  unlocked: number;
  total: number;
}

const Achivments = () => {
  const [stats, setStats] = useState<{
    topHoursGames: ISteamGame[];
    topAchievements: GameWithAchievements[];
    totalHours: number;
    totalAchievements: number;
    topPlaytimeWeeks: ISteamGame[];
  } | null>(null);
  const [achievements, setAchievements] = useState<GameWithAchievements[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedGame, setExpandedGame] = useState<number | null>(null);
  const { steamId } = useParams<{ steamId: string }>();

  const steamOwnedGames = usePostStore((state) => state.steamOwnedGames);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch(
          `http://localhost:8080/steam/games/achievements/${steamId}`
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: GameWithAchievements[] = await res.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (!steamId || achievements.length === 0) return;

    const run = async () => {
      const stats = await fetchStats(steamOwnedGames, achievements);
      setStats(stats);
    };

    run();
  }, [steamId, achievements]);

  if (loading) return <div className="text-white p-4">Завантаження...</div>;
  if (error) return <div className="text-red-500 p-4">Помилка: {error}</div>;

  return (
    <section>
      <div className="p-5">
        <div className="flex gap-2 justify-around items-center p-4 text-white">
          <div className="text-center">
            <h2 className="mb-2 text-xl">Топ 3 по часу</h2>
            <ul className="bg-slate-800 rounded-xl py-4 px-6 shadow-md flex flex-col gap-1">
              {stats?.topHoursGames?.map((game) => (
                <li key={game.appid}>
                  {game.name} — {(game.playtime_forever / 60).toFixed(1)} годин
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <h2 className="mb-2 text-xl">Топ 3 по досягнень</h2>
            <ul className="bg-slate-800 rounded-xl py-4 px-6 shadow-md flex flex-col gap-1">
              {stats?.topAchievements?.map((game) => (
                <li key={game.appid}>
                  {game.name} — {game.unlocked} Досягнень
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <h2 className="mb-2 text-xl">Топ 3 годин за 2 тижні</h2>
            <ul className="bg-slate-800 rounded-xl py-4 px-6 shadow-md flex flex-col gap-1">
              {stats?.topPlaytimeWeeks?.map((game) => (
                <li key={game.appid}>
                  {game.name} — {game.playtime_2weeks} годин
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 text-white transition-all">
        <h2 className="text-2xl font-bold">Досягнення всіх ігор</h2>
        <div className="my-4">
          {stats && (
            <h3>
              {" "}
              Весь час в іграх: {(stats.totalHours / 60).toFixed(1)} годин
            </h3>
          )}
          <ul>
            <li key={stats?.totalAchievements}>
              Всі досягнення з ігор: {stats?.totalAchievements} всього
            </li>
          </ul>
        </div>
        {achievements.length === 0 && <p>Досягнень немає</p>}
        <ul className="space-y-4">
          {achievements.map((game) => (
            <li
              key={game.appid}
              className="bg-slate-800 rounded-xl p-4 shadow-md"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>
                  setExpandedGame(
                    expandedGame === game.appid ? null : game.appid
                  )
                }
              >
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                  alt={game.name}
                  className="w-180 h-30 rounded mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{game.name}</h3>
                  <p className="text-sm text-gray-400">
                    Відкрито: {game.unlocked} / {game.total}
                  </p>
                </div>
                <span className="ml-2 text-lg">
                  {expandedGame === game.appid ? "▲" : "▼"}
                </span>
              </div>

              <AnimatePresence>
                {expandedGame === game.appid && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {game.achievements.map((ach) => (
                      <li
                        key={ach.apiname}
                        className="flex items-center bg-slate-700 rounded-lg p-2"
                      >
                        <img
                          src={ach.icon || ach.icongray}
                          alt={ach.displayName}
                          className="w-10 h-10 mr-3"
                        />
                        <div>
                          <p className="font-semibold text-lg">
                            {ach.displayName || ach.apiname}
                          </p>
                          <p className="font-light text-sm opacity-80">
                            {ach.description}
                          </p>
                          <p className="text-sm text-gray-400">
                            {ach.achieved ? "✅ Відкрито" : "❌ Не відкрито"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achivments;
