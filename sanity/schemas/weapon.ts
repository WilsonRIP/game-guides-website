import { defineField, defineType } from 'sanity'

export const weapon = defineType({
  name: 'weapon',
  title: 'Weapon',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Weapon Name',
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
      name: 'type',
      title: 'Weapon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Firearm', value: 'Firearm' },
          { title: 'Melee', value: 'Melee' },
          { title: 'Explosive', value: 'Explosive' },
          { title: 'Poison', value: 'Poison' },
          { title: 'Accident', value: 'Accident' },
          { title: 'Thrown', value: 'Thrown' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Weapon Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'concealable',
      title: 'Concealable',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Where to find this weapon',
    }),
    defineField({
      name: 'unlockLevel',
      title: 'Unlock Level',
      type: 'number',
      description: 'Mastery level required to unlock (if applicable)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
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
      media: 'image',
    },
  },
}) 