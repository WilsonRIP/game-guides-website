'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Target, Trophy, Gamepad2, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { getFeaturedContent, urlFor } from '@/lib/sanity/client';
import { FeaturedContent, Game, Guide } from '@/lib/sanity/types';

const HomePage = () => {
  const [featuredContent, setFeaturedContent] = React.useState<FeaturedContent | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchFeaturedContent() {
      try {
        const data = await getFeaturedContent();
        setFeaturedContent(data);
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedContent();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Guides",
      description: "Detailed walkthroughs for every mission and objective"
    },
    {
      icon: Target,
      title: "Strategy Tips",
      description: "Expert strategies and hidden techniques"
    },
    {
      icon: Trophy,
      title: "Achievement Help",
      description: "Complete all challenges and unlock everything"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        variants={staggerContainer()}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32"
      >
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Master Your Favorite Games
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-[700px] text-xl text-muted-foreground md:text-2xl"
            >
              Your ultimate source for comprehensive game guides, walkthroughs, and expert strategies.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/guides">
                  Explore Guides <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:border-primary/50 hover:bg-primary/5">
                <Link href="/guides">
                  Browse Games
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </motion.section>

      {/* Featured Games Section */}
      {!loading && featuredContent?.featuredGames && featuredContent.featuredGames.length > 0 && (
        <motion.section 
          className="py-20 md:py-32 bg-muted/30"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer()}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Games
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explore guides for our most popular games.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer(0.2)}
            >
              {featuredContent.featuredGames.map((game: Game) => (
                <motion.div key={game._id} variants={fadeInUp}>
                  <Link href={`/guides/${game.slug.current}`}>
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
                      {game.coverImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={urlFor(game.coverImage).width(400).height(200).url()} 
                            alt={game.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{game.name}</CardTitle>
                          <Gamepad2 className="h-5 w-5 text-primary" />
                        </div>
                        <CardDescription>{game.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{game.developer}</span>
                          <Badge variant="secondary">
                            {game.missionCount || 0} missions
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      <motion.section 
        className="py-20 md:py-32"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer()}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose Our Guides?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide the most detailed and up-to-date game guides to help you succeed.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer(0.2)}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Guides Section */}
      {!loading && featuredContent?.featuredGuides && featuredContent.featuredGuides.length > 0 && (
        <motion.section 
          className="py-20 md:py-32 bg-muted/30"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer()}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Guides
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our most popular and comprehensive game guides.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer(0.2)}
            >
              {featuredContent.featuredGuides.map((guide: Guide) => (
                <motion.div key={guide._id} variants={fadeInUp}>
                  <Link href={`/guides/${guide.game?.slug.current}/${guide.slug.current}`}>
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
                      {guide.coverImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={urlFor(guide.coverImage).width(400).height(200).url()} 
                            alt={guide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{guide.author?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{guide.estimatedTime}</span>
                          </div>
                        </div>
                        {guide.difficulty && (
                          <Badge className="mt-2" variant="outline">
                            {guide.difficulty}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section 
        className="py-20 md:py-32 bg-muted/30"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer()}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Level Up?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start exploring our comprehensive game guides and become a master player.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/guides">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
