import { defineField, defineType } from 'sanity'

export const disguise = defineType({
  name: 'disguise',
  title: 'Disguise',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Disguise Name',
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
      name: 'image',
      title: 'Disguise Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'accessAreas',
      title: 'Access Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Areas this disguise allows access to',
    }),
    defineField({
      name: 'restrictedAreas',
      title: 'Restricted Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Areas where this disguise is restricted',
    }),
    defineField({
      name: 'obtainMethod',
      title: 'How to Obtain',
      type: 'text',
      rows: 3,
      description: 'Instructions on how to get this disguise',
    }),
    defineField({
      name: 'suspiciousTo',
      title: 'Suspicious To',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'NPCs who find this disguise suspicious',
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
      subtitle: 'obtainMethod',
      media: 'image',
    },
  },
}) 