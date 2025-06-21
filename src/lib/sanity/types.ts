// Sanity document types for Game Guides website

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  crop?: {
    _type: 'sanity.imageCrop'
    bottom: number
    left: number
    right: number
    top: number
  }
  hotspot?: {
    _type: 'sanity.imageHotspot'
    height: number
    width: number
    x: number
    y: number
  }
  alt?: string
  caption?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: SanitySlug
  avatar?: SanityImage
  bio?: string
  email?: string
  website?: string
  socialLinks?: {
    twitter?: string
    youtube?: string
    twitch?: string
    discord?: string
    github?: string
  }
  expertise?: string[]
  joinedAt: string
}

export interface Game {
  _id: string
  _type: 'game'
  name: string
  slug: SanitySlug
  description?: string
  coverImage?: SanityImage
  developer?: string
  publisher?: string
  releaseDate?: string
  genres?: string[]
  platforms?: string[]
  missions?: Mission[]
  guides?: Guide[]
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  missionCount?: number
}

export interface TargetRoutine {
  timeStart: number
  location: string
  action: string
  duration: number
  securityLevel: 'Low' | 'Medium' | 'High'
}

export interface Target {
  _id: string
  _type: 'target'
  name: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  locations?: string[]
  routines?: TargetRoutine[]
  vulnerabilities?: string[]
  mission?: SanityReference
}

export interface Disguise {
  _id: string
  _type: 'disguise'
  name: string
  slug: SanitySlug
  image?: SanityImage
  accessAreas?: string[]
  restrictedAreas?: string[]
  obtainMethod?: string
  suspiciousTo?: string[]
  mission?: SanityReference
}

export interface Weapon {
  _id: string
  _type: 'weapon'
  name: string
  slug: SanitySlug
  type: 'Firearm' | 'Melee' | 'Explosive' | 'Poison' | 'Accident' | 'Thrown'
  image?: SanityImage
  concealable: boolean
  locations?: string[]
  unlockLevel?: number
  description?: string
  mission?: SanityReference
}

export interface Opportunity {
  _id: string
  _type: 'opportunity'
  name: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  steps?: string[]
  requiredItems?: string[]
  requiredDisguise?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  detailedWalkthrough?: PortableTextContent
  mission?: SanityReference
}

export interface Challenge {
  _id: string
  _type: 'challenge'
  name: string
  slug: SanitySlug
  description?: string
  type: 'Assassination' | 'Discovery' | 'Feats' | 'Targets' | 'Classics'
  xpReward: number
  requirements?: string[]
  tips?: PortableTextContent
  mission?: SanityReference
}

export interface MasteryUnlock {
  _id: string
  _type: 'masteryUnlock'
  level: number
  unlock: string
  type: 'Weapon' | 'Equipment' | 'Starting Location' | 'Agency Pickup' | 'Suit'
  description?: string
  image?: SanityImage
  mission?: SanityReference
}

export interface StartingLocation {
  name: string
  description?: string
  location: string
  unlockLevel: number
  availableDisguise?: string
}

export interface Mission {
  _id: string
  _type: 'mission'
  name: string
  slug: SanitySlug
  location: string
  difficulty: 'Novice' | 'Professional' | 'Master'
  description?: string
  missionImage?: SanityImage
  locationMap?: SanityImage
  game?: Game
  targets?: Target[]
  disguises?: Disguise[]
  weapons?: Weapon[]
  opportunities?: Opportunity[]
  challenges?: Challenge[]
  masteryUnlocks?: MasteryUnlock[]
  startingLocations?: StartingLocation[]
  tips?: PortableTextContent
  walkthrough?: PortableTextContent
}

export interface VideoEmbed {
  _type: 'videoEmbed'
  url: string
  title?: string
}

export interface Guide {
  _id: string
  _type: 'guide'
  title: string
  slug: SanitySlug
  description?: string
  coverImage?: SanityImage
  game?: Game
  mission?: Mission
  author?: Author
  content?: PortableTextContent
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  estimatedTime?: string
  featured: boolean
  publishedAt: string
  updatedAt?: string
  status: 'draft' | 'published' | 'archived'
}

// Helper types for API responses
export interface FeaturedContent {
  featuredGames: Game[]
  featuredGuides: Guide[]
  recentGuides: Guide[]
}

// Portable Text types
export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    [key: string]: unknown
  }>
}

export type PortableTextContent = Array<PortableTextBlock | SanityImage | VideoEmbed> 