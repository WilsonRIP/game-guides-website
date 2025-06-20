// components/GameCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/types'; // Assuming you created the types file
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react'; // For a nice icon (npm i lucide-react)

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link 
      href={game.guidePath} 
      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Game Image */}
        <div className="relative aspect-h-9 aspect-w-16 w-full">
          <Image
            src={game.imageUrl}
            alt={`Cover art for ${game.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {game.description}
          </p>
          <div className="flex items-center font-semibold text-primary">
            View Guide
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;