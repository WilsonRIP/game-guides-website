// pages/guides.tsx (or app/guides/page.tsx)
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getGames, urlFor } from '@/lib/sanity/client';
import { Game } from '@/lib/sanity/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, GamepadIcon, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, cardHoverEffect } from '@/lib/animations';

const GuidesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchGames() {
      try {
        const data = await getGames();
        setGames(data || []);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const filteredGames = games.filter((game: Game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (game.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const stats = [
    { icon: GamepadIcon, label: "Games Covered", value: "1+" },
    { icon: Users, label: "Players Helped", value: "1000+" },
    { icon: Star, label: "Success Rate", value: "95%" }
  ];

  return (
    <motion.section 
      className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer()}
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Game Guides Library
        </h1>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground md:text-xl">
          Master every game with our comprehensive collection of guides, walkthroughs, and expert strategies.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        variants={staggerContainer(0.1)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeInUp} className="relative mb-12">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </motion.div>

      {/* Loading State */}
      {loading ? (
        <motion.div variants={fadeInUp} className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading games...</p>
        </motion.div>
      ) : (
        <>
          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer(0.1)}
            >
              {filteredGames.map((game: Game) => (
                <motion.div
                  key={game._id}
                  variants={fadeInUp}
                  whileHover={cardHoverEffect}
                >
                  <Link href={`/guides/${game.slug.current}`} className="block group h-full">
                    <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      {/* Game Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                        {game.coverImage ? (
                          <img 
                            src={urlFor(game.coverImage).width(400).height(200).url()} 
                            alt={game.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <GamepadIcon className="h-16 w-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="bg-background/90">
                            {game.missionCount || 0} Missions
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {game.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-6">
                        <CardDescription className="text-base">
                          {game.description || 'No description available'}
                        </CardDescription>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex gap-2">
                            {game.genres?.slice(0, 2).map((genre) => (
                              <Badge key={genre} variant="outline">{genre}</Badge>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{game.developer}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-16">
              <GamepadIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No games found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available guides.
              </p>
            </motion.div>
                     )}
         </>
       )}

      {/* Featured Section */}
      <motion.section 
        variants={fadeInUp}
        className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new guides. Request a guide for your favorite game!
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            More guides coming soon
          </Badge>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default GuidesPage;