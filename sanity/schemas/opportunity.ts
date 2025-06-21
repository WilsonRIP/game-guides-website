import { defineField, defineType } from 'sanity'

export const opportunity = defineType({
  name: 'opportunity',
  title: 'Opportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Opportunity Name',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Opportunity Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Step-by-step instructions',
    }),
    defineField({
      name: 'requiredItems',
      title: 'Required Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Items needed for this opportunity',
    }),
    defineField({
      name: 'requiredDisguise',
      title: 'Required Disguise',
      type: 'string',
      description: 'Disguise needed for this opportunity',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'Easy' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Hard', value: 'Hard' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'detailedWalkthrough',
      title: 'Detailed Walkthrough',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'reference',
      to: [{ type: 'mission' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'difficulty',
      media: 'image',
    },
  },
}) 