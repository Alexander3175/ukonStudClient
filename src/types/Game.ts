interface IGame {
  id: string | null | undefined;
  title: string;
  description: string;
  tags: string[];
  gameDeveloper: string;
  releaseDate: string;
  platform: string;
  file?: string | null;
}
export type { IGame };
