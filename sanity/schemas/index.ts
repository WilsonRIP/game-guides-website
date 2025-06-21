import { game } from './game'
import { mission } from './mission'
import { target } from './target'
import { disguise } from './disguise'
import { weapon } from './weapon'
import { opportunity } from './opportunity'
import { challenge } from './challenge'
import { masteryUnlock } from './masteryUnlock'
import { guide } from './guide'
import { author } from './author'

export const schemaTypes = [
  // Main content types
  game,
  guide,
  author,
  
  // Mission-related types
  mission,
  target,
  disguise,
  weapon,
  opportunity,
  challenge,
  masteryUnlock,
] 