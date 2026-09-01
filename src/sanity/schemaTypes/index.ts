import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'School Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Location URL',
      type: 'url',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
  ],
})

export const principalMessage = defineType({
  name: 'principalMessage',
  title: 'Principal Message',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Principal Name', type: 'string' }),
    defineField({ name: 'designation', title: 'Designation', type: 'string' }),
    defineField({
      name: 'photo',
      title: 'Principal Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'shortMessage', title: 'Short Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'message', title: 'Full Message', type: 'text', rows: 8 }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const news = defineType({
  name: 'news',
  title: 'News & Announcements',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2 }),
    defineField({ name: 'content', title: 'Content', type: 'text', rows: 6 }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'role', title: 'Role', type: 'string' },
      ],
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'date' }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'isFeatured', title: 'Feature on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const event = defineType({
  name: 'event',
  title: 'School Events',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'startDate', title: 'Start Date / Time', type: 'datetime' }),
    defineField({ name: 'endDate', title: 'End Date / Time', type: 'datetime' }),
    defineField({ name: 'location', title: 'Location / Venue', type: 'string' }),
    defineField({ name: 'registrationUrl', title: 'Registration / Details URL', type: 'url' }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'isFeatured', title: 'Feature on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'year', title: 'Academic Year', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'string' }),
    defineField({ name: 'studentName', title: 'Student / Team Name', type: 'string' }),
    defineField({ name: 'class', title: 'Class / Grade', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'isFeatured', title: 'Feature on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const galleryAlbum = defineType({
  name: 'galleryAlbum',
  title: 'Gallery Albums',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Album Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'eventDate', title: 'Event Date', type: 'date' }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Album Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const facility = defineType({
  name: 'facility',
  title: 'Campus Facilities',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Facility Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'specifications', title: 'Specifications', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 1 }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Person Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role (e.g. Parent of Class 10 Student)', type: 'string' }),
    defineField({ name: 'detail', title: 'Detail', type: 'string' }),
    defineField({ name: 'quote', title: 'Quote / Testimonial Text', type: 'text', rows: 4 }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 1 }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 1 }),
    defineField({ name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: true }),
  ],
})

export const schemaTypes = [
  siteSettings,
  principalMessage,
  news,
  event,
  achievement,
  galleryAlbum,
  facility,
  testimonial,
  faq,
]
