# Sanity CMS Setup Guide for Game Guides Website

## Overview

This guide will help you set up **Sanity CMS** for your game guides website. Sanity is a headless CMS that provides a powerful studio interface for content management and a flexible API for your Next.js application.

## Why Sanity CMS?

- **Perfect for Complex Data**: Ideal for your game data (missions, targets, disguises, etc.)
- **Real-time Collaboration**: Multiple editors can work simultaneously
- **Rich Media Management**: Easy image and video handling
- **Powerful Query Language (GROQ)**: Flexible data fetching
- **Version Control**: Track all content changes
- **Preview Mode**: See changes before publishing
- **Customizable Studio**: Tailored content editing interface

## Step 1: Create a Sanity Project

1. **Sign up for Sanity**: Go to [sanity.io](https://sanity.io) and create an account
2. **Create a new project**:
   - Choose "Create new project"
   - Give it a name like "Game Guides Website"
   - Choose a project ID (keep it simple, like `game-guides`)
   - Select "Production" dataset name
   - Choose your region

3. **Get your project credentials**:
   - Project ID: Found in your Sanity dashboard
   - Dataset: Usually "production"

## Step 2: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# Optional: For write operations (if needed later)
# SANITY_API_TOKEN=your_api_token_here

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 3: Install Dependencies

I've already updated your `package.json` with the required dependencies. Install them:

```bash
npm install
# or
bun install
```

The added packages include:
- `sanity` - Main Sanity package
- `@sanity/image-url` - Image URL builder
- `@sanity/vision` - Query testing tool
- `next-sanity` - Next.js integration

## Step 4: Access Sanity Studio

Once your environment variables are set, you can access Sanity Studio at:

```
http://localhost:3000/studio
```

This will open the Sanity Studio interface where you can:
- Create and edit content
- Manage images and media
- Configure content relationships
- Preview your content

## Step 5: Schema Overview

I've created comprehensive schemas for your game guides:

### Main Content Types:
- **Game**: Core game information (Hitman 3, etc.)
- **Mission**: Individual missions with all related data
- **Guide**: Detailed guides with rich content
- **Author**: Content creators and guide authors

### Mission-Related Types:
- **Target**: Mission targets with routines and vulnerabilities
- **Disguise**: Available disguises with access permissions
- **Weapon**: Weapons with locations and properties
- **Opportunity**: Mission opportunities with step-by-step instructions
- **Challenge**: Challenges with XP rewards and requirements
- **Mastery Unlock**: Mastery rewards and unlocks

## Step 6: Data Migration Strategy

### Option A: Manual Content Creation
1. Start by creating a **Game** document for Hitman 3
2. Create **Mission** documents for each level
3. Add related **Targets**, **Disguises**, **Weapons**, etc.
4. Create **Guide** documents with rich content

### Option B: Programmatic Data Import
You can create a script to import your existing TypeScript data:

```typescript
// Import script example
import { sanityClient } from './src/lib/sanity/client'
import { MISSIONS } from './src/lib/data/hitman3'

async function importMissions() {
  for (const mission of MISSIONS) {
    const sanityMission = {
      _type: 'mission',
      name: mission.name,
      location: mission.location,
      difficulty: mission.difficulty,
      // ... transform other fields
    }
    
    await sanityClient.create(sanityMission)
  }
}
```

## Step 7: Update Your Next.js Components

### Example: Updated Game Card Component

```typescript
import { urlFor } from '@/lib/sanity/client'
import { Game } from '@/lib/sanity/types'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <div className="game-card">
      {game.coverImage && (
        <img 
          src={urlFor(game.coverImage).width(400).height(200).url()} 
          alt={game.name}
        />
      )}
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <span>{game.developer}</span>
    </div>
  )
}
```

### Example: Fetching Data in Page Components

```typescript
import { getGames } from '@/lib/sanity/client'
import { Game } from '@/lib/sanity/types'

export default async function GamesPage() {
  const games: Game[] = await getGames()
  
  return (
    <div>
      <h1>Game Guides</h1>
      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  )
}
```

## Step 8: Rich Content with Portable Text

For rich content in guides, use Portable Text:

```typescript
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <img 
        src={urlFor(value).width(800).url()} 
        alt={value.alt || 'Guide image'} 
      />
    ),
    videoEmbed: ({ value }: any) => (
      <iframe 
        src={value.url} 
        title={value.title}
        width="100%" 
        height="400"
      />
    ),
  },
}

export function GuideContent({ content }: { content: any[] }) {
  return (
    <PortableText 
      value={content} 
      components={portableTextComponents} 
    />
  )
}
```

## Step 9: Preview Mode (Optional)

Set up preview mode for draft content:

```typescript
// pages/api/preview.ts
export default function handler(req: any, res: any) {
  res.setPreviewData({})
  res.redirect(req.query.slug || '/')
}

// pages/api/exit-preview.ts
export default function handler(req: any, res: any) {
  res.clearPreviewData()
  res.redirect('/')
}
```

## Step 10: Deployment Considerations

### Environment Variables in Production:
- Add your Sanity credentials to your hosting platform (Vercel, Netlify, etc.)
- Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set

### Studio Access:
- Your Sanity Studio will be available at `yoursite.com/studio`
- Configure CORS in Sanity dashboard for your domain
- Set up authentication for studio access

## Best Practices

1. **Content Structure**: Plan your content relationships carefully
2. **Image Optimization**: Use Sanity's image transformation API
3. **Caching**: Leverage Sanity's CDN for better performance
4. **Validation**: Use Sanity's validation rules in schemas
5. **Backup**: Sanity automatically backs up your data
6. **Version Control**: Track schema changes in your codebase

## Useful Sanity Studio Customizations

### Custom Preview URLs:
```typescript
// In your schema files
preview: {
  select: {
    title: 'name',
    slug: 'slug.current'
  },
  prepare({ title, slug }) {
    return {
      title,
      subtitle: 'Game',
      media: '🎮'
    }
  }
}
```

### Custom Actions:
```typescript
// Add custom actions in studio
import { defineField } from 'sanity'

// Example: Duplicate mission action
export const duplicateAction = {
  name: 'duplicate',
  title: 'Duplicate',
  action: async (props: any) => {
    // Custom duplication logic
  }
}
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Add your domain to Sanity's CORS settings
2. **Authentication**: Check your project ID and dataset name
3. **Image Loading**: Verify your Next.js image domains configuration
4. **TypeScript Errors**: Ensure all types are properly imported

### Getting Help:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/nextjs)

## Next Steps

1. Set up your Sanity project and get your credentials
2. Add environment variables to `.env.local`
3. Run `npm run dev` and visit `/studio`
4. Start creating your first game and mission content
5. Update your existing components to use Sanity data
6. Gradually migrate from static data to Sanity CMS

## Benefits You'll Get

- **Content Management**: Easy content editing for non-technical users
- **Collaboration**: Multiple people can work on content simultaneously
- **Rich Media**: Drag-and-drop image and video management
- **Scalability**: Add new games and guides without code changes
- **SEO**: Better content structure for search engines
- **Performance**: Optimized images and content delivery

This setup will transform your game guides website into a professional, scalable content management system that's easy to maintain and expand! 