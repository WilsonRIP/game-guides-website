'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { notFound } from 'next/navigation';
import { getGameBySlug } from '@/lib/sanity/client';
import { Game, Mission } from '@/lib/sanity/types';
import Link from 'next/link';
import { ChevronRight, Clock, Target, Trophy, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, cardHoverEffect } from '@/lib/animations';

interface GameGuidePageProps {
  params: Promise<{
    game: string;
  }>;
}

const GameGuidePage = ({ params }: GameGuidePageProps) => {
  const { game } = React.use(params);
  const [gameData, setGameData] = React.useState<Game | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchGameData() {
      try {
        const data = await getGameBySlug(game);
        if (!data) {
          notFound();
        }
        setGameData(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchGameData();
  }, [game]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading game data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!gameData) {
    notFound();
  }

  const missionsToShow = gameData.missions || [];

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'Novice': return 'default';
      case 'Professional': return 'secondary';
      case 'Master': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <motion.section 
      className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer()}
    >
      {/* Breadcrumb */}
      <motion.div variants={fadeInUp} className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{gameData.name}</span>
      </motion.div>

      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              {gameData.name} Guide
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
              Complete walkthroughs, strategies, and tips for every mission in {gameData.name}.
            </p>
          </div>
          
          {missionsToShow.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{missionsToShow.length}</div>
                  <div className="text-sm text-muted-foreground">Missions</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{missionsToShow.reduce((acc: number, mission: Mission) => acc + (mission.targets?.length || 0), 0)}</div>
                  <div className="text-sm text-muted-foreground">Targets</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </motion.div>

      {missionsToShow.length > 0 ? (
        <>
          {/* Progress Overview */}
          <motion.div variants={fadeInUp} className="mb-12">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Missions Completed</span>
                    <span>0 / {missionsToShow.length}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">0</div>
                      <div className="text-xs text-muted-foreground">Silent Assassin</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">0</div>
                      <div className="text-xs text-muted-foreground">Suit Only</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">0</div>
                      <div className="text-xs text-muted-foreground">Challenges</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Missions Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={staggerContainer(0.1)}
          >
            {missionsToShow.map((mission: Mission, index: number) => (
              <motion.div
                key={mission._id}
                variants={fadeInUp}
                whileHover={cardHoverEffect}
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                  {/* Mission Header */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant={getDifficultyBadgeVariant(mission.difficulty)}>
                        {mission.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/90">
                        Mission {index + 1}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{mission.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        {mission.location}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Targets */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Targets ({mission.targets?.length || 0})
                      </h4>
                      <div className="space-y-3">
                        {mission.targets?.map((target) => (
                          <div key={target._id} className="p-3 rounded-lg bg-muted/50 border">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{target.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">{target.description}</p>
                              </div>
                              <div className="ml-3 flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-3 w-3 fill-muted stroke-muted" />
                                ))}
                              </div>
                            </div>
                          </div>
                        )) || <div className="text-sm text-muted-foreground">No targets available</div>}
                      </div>
                    </div>

                    {/* Mission Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                      <div>
                        <div className="text-lg font-semibold">{mission.disguises?.length || 0}</div>
                        <div className="text-xs text-muted-foreground">Disguises</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{mission.opportunities?.length || 0}</div>
                        <div className="text-xs text-muted-foreground">Opportunities</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{mission.challenges?.length || 0}</div>
                        <div className="text-xs text-muted-foreground">Challenges</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div variants={fadeInUp} className="text-center py-20">
          <div className="mx-auto max-w-md">
            <div className="mb-6">
              <Clock className="mx-auto h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re working hard to bring you comprehensive guides for {gameData.name}. 
              Check back soon for detailed walkthroughs and strategies.
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              In Development
            </Badge>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default GameGuidePage; 