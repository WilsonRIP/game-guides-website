import { defineField, defineType } from 'sanity'

export const challenge = defineType({
  name: 'challenge',
  title: 'Challenge',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Challenge Name',
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
      name: 'type',
      title: 'Challenge Type',
      type: 'string',
      options: {
        list: [
          { title: 'Assassination', value: 'Assassination' },
          { title: 'Discovery', value: 'Discovery' },
          { title: 'Feats', value: 'Feats' },
          { title: 'Targets', value: 'Targets' },
          { title: 'Classics', value: 'Classics' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'xpReward',
      title: 'XP Reward',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What needs to be done to complete this challenge',
    }),
    defineField({
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Tips for completing this challenge',
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
      subtitle: 'type',
      description: 'xpReward',
    },
    prepare({ title, subtitle, description }) {
      return {
        title,
        subtitle: `${subtitle} - ${description} XP`,
      }
    },
  },
}) 