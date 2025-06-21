import { defineField, defineType } from 'sanity'

export const masteryUnlock = defineType({
  name: 'masteryUnlock',
  title: 'Mastery Unlock',
  type: 'document',
  fields: [
    defineField({
      name: 'level',
      title: 'Mastery Level',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(20),
    }),
    defineField({
      name: 'unlock',
      title: 'Unlock Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Unlock Type',
      type: 'string',
      options: {
        list: [
          { title: 'Weapon', value: 'Weapon' },
          { title: 'Equipment', value: 'Equipment' },
          { title: 'Starting Location', value: 'Starting Location' },
          { title: 'Agency Pickup', value: 'Agency Pickup' },
          { title: 'Suit', value: 'Suit' },
        ],
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
      title: 'Unlock Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      title: 'unlock',
      subtitle: 'type',
      description: 'level',
      media: 'image',
    },
    prepare({ title, subtitle, description, media }) {
      return {
        title,
        subtitle: `${subtitle} - Level ${description}`,
        media,
      }
    },
  },
}) 