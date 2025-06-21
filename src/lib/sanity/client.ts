import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Create the client
export const sanityClient = createClient(config)

// Helper for generating image URLs
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries for common data fetching
export const queries = {
  // Get all published games
  games: `*[_type == "game" && status == "published"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    coverImage,
    developer,
    publisher,
    releaseDate,
    genres,
    platforms,
    featured,
    "missionCount": count(*[_type == "mission" && references(^._id)])
  }`,

  // Get game by slug with related missions
  gameBySlug: `*[_type == "game" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    coverImage,
    developer,
    publisher,
    releaseDate,
    genres,
    platforms,
    "missions": *[_type == "mission" && references(^._id)] | order(name asc) {
      _id,
      name,
      slug,
      location,
      difficulty,
      description,
      missionImage
    },
    "guides": *[_type == "guide" && references(^._id) && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      coverImage,
      difficulty,
      estimatedTime,
      publishedAt,
      author-> {
        name,
        avatar
      }
    }
  }`,

  // Get mission by slug with all related data
  missionBySlug: `*[_type == "mission" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    difficulty,
    description,
    missionImage,
    locationMap,
    game-> {
      name,
      slug
    },
    "targets": targets[] -> {
      _id,
      name,
      slug,
      description,
      image,
      locations,
      routines,
      vulnerabilities
    },
    "disguises": disguises[] -> {
      _id,
      name,
      slug,
      image,
      accessAreas,
      restrictedAreas,
      obtainMethod,
      suspiciousTo
    },
    "weapons": weapons[] -> {
      _id,
      name,
      slug,
      type,
      image,
      concealable,
      locations,
      unlockLevel,
      description
    },
    "opportunities": opportunities[] -> {
      _id,
      name,
      slug,
      description,
      image,
      steps,
      requiredItems,
      requiredDisguise,
      difficulty
    },
    "challenges": challenges[] -> {
      _id,
      name,
      slug,
      description,
      type,
      xpReward,
      requirements
    },
    "masteryUnlocks": masteryUnlocks[] -> {
      _id,
      level,
      unlock,
      type,
      description,
      image
    },
    startingLocations,
    tips,
    walkthrough
  }`,

  // Get all published guides
  guides: `*[_type == "guide" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    difficulty,
    estimatedTime,
    publishedAt,
    tags,
    featured,
    game-> {
      name,
      slug,
      coverImage
    },
    author-> {
      name,
      slug,
      avatar
    }
  }`,

  // Get guide by slug
  guideBySlug: `*[_type == "guide" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    description,
    coverImage,
    content,
    difficulty,
    estimatedTime,
    publishedAt,
    updatedAt,
    tags,
    game-> {
      name,
      slug,
      coverImage
    },
    mission-> {
      name,
      slug,
      location
    },
    author-> {
      name,
      slug,
      avatar,
      bio,
      socialLinks
    }
  }`,

  // Get featured content for homepage
  featuredContent: `{
    "featuredGames": *[_type == "game" && featured == true && status == "published"] | order(name asc) [0...3] {
      _id,
      name,
      slug,
      description,
      coverImage,
      developer,
      "missionCount": count(*[_type == "mission" && references(^._id)])
    },
    "featuredGuides": *[_type == "guide" && featured == true && status == "published"] | order(publishedAt desc) [0...6] {
      _id,
      title,
      slug,
      description,
      coverImage,
      difficulty,
      estimatedTime,
      publishedAt,
      game-> {
        name,
        slug
      },
      author-> {
        name,
        avatar
      }
    },
    "recentGuides": *[_type == "guide" && status == "published"] | order(publishedAt desc) [0...4] {
      _id,
      title,
      slug,
      description,
      coverImage,
      publishedAt,
      game-> {
        name,
        slug
      }
    }
  }`,
}

// Helper functions for data fetching
export async function getGames() {
  return sanityClient.fetch(queries.games)
}

export async function getGameBySlug(slug: string) {
  return sanityClient.fetch(queries.gameBySlug, { slug })
}

export async function getMissionBySlug(slug: string) {
  return sanityClient.fetch(queries.missionBySlug, { slug })
}

export async function getGuides() {
  return sanityClient.fetch(queries.guides)
}

export async function getGuideBySlug(slug: string) {
  return sanityClient.fetch(queries.guideBySlug, { slug })
}

export async function getFeaturedContent() {
  return sanityClient.fetch(queries.featuredContent)
} 