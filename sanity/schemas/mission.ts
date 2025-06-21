import { defineField, defineType } from 'sanity'

export const mission = defineType({
  name: 'mission',
  title: 'Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Mission Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Novice', value: 'Novice' },
          { title: 'Professional', value: 'Professional' },
          { title: 'Master', value: 'Master' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'missionImage',
      title: 'Mission Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'locationMap',
      title: 'Location Map',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'game',
      title: 'Game',
      type: 'reference',
      to: [{ type: 'game' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'targets',
      title: 'Targets',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'target' }] }],
    }),
    defineField({
      name: 'disguises',
      title: 'Disguises',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'disguise' }] }],
    }),
    defineField({
      name: 'weapons',
      title: 'Weapons',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'weapon' }] }],
    }),
    defineField({
      name: 'opportunities',
      title: 'Opportunities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'opportunity' }] }],
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'challenge' }] }],
    }),
    defineField({
      name: 'masteryUnlocks',
      title: 'Mastery Unlocks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'masteryUnlock' }] }],
    }),
    defineField({
      name: 'startingLocations',
      title: 'Starting Locations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'location', title: 'Location', type: 'string' },
          { name: 'unlockLevel', title: 'Unlock Level', type: 'number' },
          { name: 'availableDisguise', title: 'Available Disguise', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'tips',
      title: 'Tips & Strategies',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'walkthrough',
      title: 'Mission Walkthrough',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'missionImage',
    },
  },
}) 