export interface Game {
  id: string;
  name: string;
  description: string;
  guidePath: string;
}

export const games: Game[] = [
  {
    id: 'hitman-3',
    name: 'Hitman 3',
    description: 'A stealth video game developed and published by IO Interactive.',
    guidePath: '/guides/hitman-3'
  }
]; 