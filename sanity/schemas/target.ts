import { defineField, defineType } from 'sanity'

export const target = defineType({
  name: 'target',
  title: 'Target',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Target Name',
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
      title: 'Target Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Areas where the target can be found',
    }),
    defineField({
      name: 'routines',
      title: 'Target Routines',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Routine',
        fields: [
          { name: 'timeStart', title: 'Start Time (seconds)', type: 'number' },
          { name: 'location', title: 'Location', type: 'string' },
          { name: 'action', title: 'Action', type: 'text' },
          { name: 'duration', title: 'Duration (seconds)', type: 'number' },
          { name: 'securityLevel', title: 'Security Level', type: 'string', options: {
            list: ['Low', 'Medium', 'High']
          }},
        ],
      }],
    }),
    defineField({
      name: 'vulnerabilities',
      title: 'Vulnerabilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ways to eliminate the target',
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
      subtitle: 'description',
      media: 'image',
    },
  },
}) 