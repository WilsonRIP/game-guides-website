'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const HomePage = () => {
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
