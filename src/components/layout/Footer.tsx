import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { socialLinks } from '@/lib/data/socials';
import { mainNavLinks } from '@/lib/data/navigation';
import { GamepadIcon, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navigation',
      links: mainNavLinks.map(item => ({
        name: item.name,
        href: item.url,
        external: false
      }))
    },
    {
      title: 'Resources',
      links: [
        { name: 'Game Guides', href: '/guides', external: false },
        { name: 'Walkthroughs', href: '/guides', external: false },
        { name: 'Tips & Tricks', href: '/guides', external: false },
        { name: 'Community', href: '#', external: false }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#', external: false },
        { name: 'Contact Us', href: '#', external: false },
        { name: 'Report Issue', href: '#', external: false },
        { name: 'Feedback', href: '#', external: false }
      ]
    }
  ];

  return (
    <footer className="border-t bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary group-hover:scale-105 transition-transform">
                <GamepadIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameGuides
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Your ultimate destination for comprehensive game guides, expert strategies, and detailed walkthroughs. 
              Master every game with our community-driven content.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Follow us:</span>
              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <Button key={social.name} variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-primary/10">
                    <Link 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image 
                        src={social.icon} 
                        alt={social.name}
                        width={16}
                        height={16}
                        className="dark:invert"
                      />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      {link.name}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>© {currentYear} GameGuides. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for gamers worldwide.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 