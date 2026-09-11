import { groq } from 'next-sanity'

// 1. Site Settings Query
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    _id,
    schoolName,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    "faviconUrl": favicon.asset->url,
    shortDescription,
    phone,
    email,
    address,
    googleMapsUrl,
    whatsappNumber,
    socialLinks[]{
      platform,
      url
    },
    officeHours,
    defaultSEO{
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noIndex
    }
  }
`

// 2. Principal Message Query
export const PRINCIPAL_MESSAGE_QUERY = groq`
  *[_type == "principalMessage" && (!defined(isPublished) || isPublished == true)][0]{
    _id,
    name,
    designation,
    qualifications,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
    photo,
    shortMessage,
    message,
    isPublished
  }
`

// 2b. Director Message Query
export const DIRECTOR_MESSAGE_QUERY = groq`
  *[_type == "directorMessage" && (!defined(isPublished) || isPublished == true)][0]{
    _id,
    name,
    designation,
    qualifications,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
    photo,
    shortMessage,
    message,
    isPublished
  }
`

// 3. Academic Stages Query
export const ACADEMIC_STAGES_QUERY = groq`
  *[_type == "academicStage" && (!defined(isPublished) || isPublished == true)] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    stage,
    shortDescription,
    description,
    keyFeatures,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    gallery[]{
      "url": asset->url,
      alt
    },
    order
  }
`

// 4. Facilities Query
export const FACILITIES_QUERY = groq`
  *[_type == "facility" && (!defined(isPublished) || isPublished == true)] | order(order asc){
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    specifications,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    gallery[]{
      "url": asset->url,
      alt
    },
    order
  }
`

// 5. Student Life Query
export const STUDENT_LIFE_QUERY = groq`
  *[_type == "studentLife" && (!defined(isPublished) || isPublished == true)] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    gallery[]{
      "url": asset->url,
      alt
    },
    order
  }
`

// 6. Achievements Query
export const ACHIEVEMENTS_QUERY = groq`
  *[_type == "achievement" && (!defined(isPublished) || isPublished == true)] | order(date desc, year desc){
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    date,
    studentName,
    class,
    description,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    isFeatured
  }
`

// 7. News & Announcements Query
export const NEWS_QUERY = groq`
  *[_type == "news" && (!defined(isPublished) || isPublished == true)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    content,
    author{
      name,
      role
    },
    publishedAt,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    isFeatured
  }
`

// 8. Events Query
export const EVENTS_QUERY = groq`
  *[_type == "event" && (!defined(isPublished) || isPublished == true)] | order(startDate asc){
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    startDate,
    endDate,
    location,
    registrationUrl,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    isFeatured
  }
`

// 9. Gallery Albums Query
export const GALLERY_ALBUMS_QUERY = groq`
  *[_type == "galleryAlbum" && (!defined(isPublished) || isPublished == true)] | order(eventDate desc){
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    eventDate,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    images[]{
      "url": asset->url,
      alt,
      caption
    }
  }
`

// 10. Testimonials Query
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && (!defined(isPublished) || isPublished == true)] | order(order asc){
    _id,
    name,
    role,
    detail,
    quote,
    videoUrl,
    "photoUrl": photo.asset->url,
    isFeatured,
    order
  }
`

// 11. Admissions Information Query
export const ADMISSIONS_INFO_QUERY = groq`
  *[_type == "admissionInformation" && (!defined(isCurrent) || isCurrent == true)][0]{
    _id,
    academicYear,
    intro,
    eligibility,
    process[]{
      stepNumber,
      title,
      description
    },
    requiredDocuments,
    importantDates[]{
      event,
      date,
      notes
    },
    feeInformation,
    "prospectusUrl": prospectus.asset->url,
    contactInformation{
      helpline,
      email,
      whatsapp,
      officeHours
    }
  }
`

// 12. FAQs Query
export const FAQS_QUERY = groq`
  *[_type == "faq" && (!defined(isPublished) || isPublished == true)] | order(order asc){
    _id,
    question,
    answer,
    category,
    order
  }
`

// 13. Single Page by Slug
export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    pageType,
    hero{
      badge,
      heading,
      subheading,
      "backgroundImageUrl": backgroundImage.asset->url
    },
    sections,
    publishedAt,
    seo{
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noIndex
    }
  }
`
