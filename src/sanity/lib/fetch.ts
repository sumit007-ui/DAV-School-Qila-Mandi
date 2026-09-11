import { client } from './client'
import { getSanityImageUrl } from './image'
import {
  SITE_SETTINGS_QUERY,
  PRINCIPAL_MESSAGE_QUERY,
  DIRECTOR_MESSAGE_QUERY,
  ACADEMIC_STAGES_QUERY,
  FACILITIES_QUERY,
  STUDENT_LIFE_QUERY,
  ACHIEVEMENTS_QUERY,
  NEWS_QUERY,
  EVENTS_QUERY,
  GALLERY_ALBUMS_QUERY,
  TESTIMONIALS_QUERY,
  ADMISSIONS_INFO_QUERY,
  FAQS_QUERY,
} from './queries'

// Local data fallbacks
import { NEWS_STORIES } from '@/lib/data/news'
import { SCHOOL_EVENTS } from '@/lib/data/events'
import { ACHIEVEMENTS } from '@/lib/data/achievements'
import { GALLERY_ITEMS } from '@/lib/data/gallery'
import { CAMPUS_FACILITIES } from '@/lib/data/campus'
import { ACADEMIC_PROGRAMS } from '@/lib/data/academics'
import { TESTIMONIALS } from '@/lib/data/testimonials'
import { ADMISSION_STEPS, ADMISSION_FAQS } from '@/lib/data/admissions'
import { SCHOOL_CONFIG } from '@/config/school'

export async function getSiteSettings() {
  try {
    const data = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && data.schoolName) {
      return {
        schoolName: data.schoolName || SCHOOL_CONFIG.name,
        shortDescription: data.shortDescription || SCHOOL_CONFIG.tagline,
        phone: data.phone || SCHOOL_CONFIG.contact.primaryPhone,
        email: data.email || SCHOOL_CONFIG.contact.email,
        address: data.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.area}, ${SCHOOL_CONFIG.address.city}, ${SCHOOL_CONFIG.address.district} - ${SCHOOL_CONFIG.address.pincode}`,
        googleMapsUrl: data.googleMapsUrl || SCHOOL_CONFIG.address.googleMapsUrl,
        whatsappNumber: data.whatsappNumber || SCHOOL_CONFIG.contact.whatsapp,
        officeHours: data.officeHours || SCHOOL_CONFIG.contact.officeHours,
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        socialLinks: data.socialLinks || [
          { platform: 'facebook', url: SCHOOL_CONFIG.links.facebook },
          { platform: 'instagram', url: SCHOOL_CONFIG.links.instagram },
          { platform: 'youtube', url: SCHOOL_CONFIG.links.youtube },
        ],
      }
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching siteSettings, using fallback:', err)
  }
  return {
    schoolName: SCHOOL_CONFIG.name,
    shortDescription: SCHOOL_CONFIG.tagline,
    phone: SCHOOL_CONFIG.contact.primaryPhone,
    email: SCHOOL_CONFIG.contact.email,
    address: `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.area}, ${SCHOOL_CONFIG.address.city}, ${SCHOOL_CONFIG.address.district} - ${SCHOOL_CONFIG.address.pincode} (${SCHOOL_CONFIG.address.state})`,
    googleMapsUrl: SCHOOL_CONFIG.address.googleMapsUrl,
    whatsappNumber: SCHOOL_CONFIG.contact.whatsapp,
    officeHours: SCHOOL_CONFIG.contact.officeHours,
    socialLinks: [
      { platform: 'facebook', url: SCHOOL_CONFIG.links.facebook },
      { platform: 'instagram', url: SCHOOL_CONFIG.links.instagram },
      { platform: 'youtube', url: SCHOOL_CONFIG.links.youtube },
    ],
  }
}

export async function getPrincipalMessage() {
  try {
    const data = await client.fetch(PRINCIPAL_MESSAGE_QUERY, {}, { next: { revalidate: 0 } })
    if (data && data.name) {
      let fullMessage: string[] = []
      if (Array.isArray(data.message)) {
        fullMessage = data.message
          .map((b: any) =>
            typeof b === 'string'
              ? b
              : b.children?.map((c: any) => c.text).join('') || ''
          )
          .filter(Boolean)
      } else if (typeof data.message === 'string' && data.message.trim()) {
        fullMessage = data.message
          .split(/\n\n+/)
          .map((p: string) => p.trim())
          .filter(Boolean)
      }

      if (fullMessage.length === 0) {
        fullMessage = SCHOOL_CONFIG.leadership.principal.fullMessage
      }

      const excerpt =
        data.shortMessage?.trim() ||
        (fullMessage.length > 0 ? fullMessage[0] : SCHOOL_CONFIG.leadership.principal.messageExcerpt)

      const resolvedPhoto =
        data.photoUrl ||
        (data.photo ? getSanityImageUrl(data.photo) : null) ||
        SCHOOL_CONFIG.leadership.principal.image

      return {
        name: data.name || SCHOOL_CONFIG.leadership.principal.name,
        designation: data.designation || SCHOOL_CONFIG.leadership.principal.designation,
        qualifications: data.qualifications || SCHOOL_CONFIG.leadership.principal.qualifications,
        photoUrl: resolvedPhoto,
        image: resolvedPhoto,
        shortMessage: excerpt,
        messageExcerpt: excerpt,
        fullMessage: fullMessage,
      }
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching principalMessage, using fallback:', err)
  }
  return {
    name: SCHOOL_CONFIG.leadership.principal.name,
    designation: SCHOOL_CONFIG.leadership.principal.designation,
    qualifications: SCHOOL_CONFIG.leadership.principal.qualifications,
    photoUrl: SCHOOL_CONFIG.leadership.principal.image,
    image: SCHOOL_CONFIG.leadership.principal.image,
    shortMessage: SCHOOL_CONFIG.leadership.principal.messageExcerpt,
    messageExcerpt: SCHOOL_CONFIG.leadership.principal.messageExcerpt,
    fullMessage: SCHOOL_CONFIG.leadership.principal.fullMessage,
  }
}

export async function getDirectorMessage() {
  try {
    const data = await client.fetch(DIRECTOR_MESSAGE_QUERY, {}, { next: { revalidate: 0 } })
    if (data && data.name) {
      let fullMessage: string[] = []
      if (Array.isArray(data.message)) {
        fullMessage = data.message
          .map((b: any) =>
            typeof b === 'string'
              ? b
              : b.children?.map((c: any) => c.text).join('') || ''
          )
          .filter(Boolean)
      } else if (typeof data.message === 'string' && data.message.trim()) {
        fullMessage = data.message
          .split(/\n\n+/)
          .map((p: string) => p.trim())
          .filter(Boolean)
      }

      if (fullMessage.length === 0) {
        fullMessage = SCHOOL_CONFIG.leadership.director.fullMessage
      }

      const excerpt =
        data.shortMessage?.trim() ||
        (fullMessage.length > 0 ? fullMessage[0] : SCHOOL_CONFIG.leadership.director.messageExcerpt)

      const resolvedPhoto =
        data.photoUrl ||
        (data.photo ? getSanityImageUrl(data.photo) : null) ||
        SCHOOL_CONFIG.leadership.director.image

      return {
        name: data.name || SCHOOL_CONFIG.leadership.director.name,
        designation: data.designation || SCHOOL_CONFIG.leadership.director.designation,
        qualifications: data.qualifications || SCHOOL_CONFIG.leadership.director.qualifications,
        photoUrl: resolvedPhoto,
        image: resolvedPhoto,
        shortMessage: excerpt,
        messageExcerpt: excerpt,
        fullMessage: fullMessage,
      }
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching directorMessage, using fallback:', err)
  }
  return {
    name: SCHOOL_CONFIG.leadership.director.name,
    designation: SCHOOL_CONFIG.leadership.director.designation,
    qualifications: SCHOOL_CONFIG.leadership.director.qualifications,
    photoUrl: SCHOOL_CONFIG.leadership.director.image,
    image: SCHOOL_CONFIG.leadership.director.image,
    shortMessage: SCHOOL_CONFIG.leadership.director.messageExcerpt,
    messageExcerpt: SCHOOL_CONFIG.leadership.director.messageExcerpt,
    fullMessage: SCHOOL_CONFIG.leadership.director.fullMessage,
  }
}

export async function getAcademicStages() {
  try {
    const data = await client.fetch(ACADEMIC_STAGES_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        id: item._id,
        slug: item.slug || item._id,
        level: item.stage || item.title,
        classes: item.shortDescription || item.title,
        tagline: item.shortDescription || item.title,
        description: item.description || '',
        keyFeatures: item.keyFeatures || [],
        subjects: ['Mathematics', 'Science & EVS', 'English Literature', 'Hindi', 'Punjabi', 'Social Studies'],
        image: item.featuredImageUrl || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200',
      }))
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching academicStages, using fallback:', err)
  }
  return ACADEMIC_PROGRAMS
}

export async function getFacilities() {
  try {
    const data = await client.fetch(FACILITIES_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        id: item._id,
        slug: item.slug || item._id,
        title: item.name,
        category: item.category || 'Academic',
        headline: item.description?.slice(0, 100) || item.name,
        description: item.description || '',
        specifications: item.specifications || [],
        image: item.featuredImageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
      }))
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching facilities, using fallback:', err)
  }
  return CAMPUS_FACILITIES
}

export async function getAchievements() {
  try {
    const data = await client.fetch(ACHIEVEMENTS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        id: item._id,
        title: item.title,
        category: item.category || 'Academics',
        year: item.year || (item.date ? new Date(item.date).getFullYear().toString() : '2025'),
        studentOrTeam: item.studentName || 'DAV Scholar',
        classOrGrade: item.class || '',
        description: item.description || '',
        image: item.featuredImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
      }))
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching achievements, using fallback:', err)
  }
  return ACHIEVEMENTS
}

export async function getNews() {
  try {
    const data = await client.fetch(NEWS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        const dateStr = item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          : 'Recent'

        const contentLines = Array.isArray(item.content)
          ? item.content
              .map((b: any) =>
                typeof b === 'string'
                  ? b
                  : b.children?.map((c: any) => c.text).join('') || ''
              )
              .filter(Boolean)
          : [item.excerpt || '']

        return {
          id: item._id,
          slug: item.slug || item._id,
          title: item.title,
          category: item.category || 'Academic',
          date: dateStr,
          readTime: '3 min read',
          excerpt: item.excerpt || (contentLines[0] ? contentLines[0].slice(0, 150) + '...' : ''),
          content: contentLines.length > 0 ? contentLines : [item.excerpt || ''],
          author: {
            name: item.author?.name || 'Editorial Board',
            role: item.author?.role || 'DAV Qilla Mandi',
          },
          image: item.featuredImageUrl || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
          featured: Boolean(item.isFeatured),
        }
      })
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching news, using fallback:', err)
  }
  return NEWS_STORIES
}

export async function getEvents() {
  try {
    const data = await client.fetch(EVENTS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        const dateStr = item.startDate
          ? new Date(item.startDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          : 'Upcoming'

        return {
          id: item._id,
          slug: item.slug || item._id,
          title: item.title,
          category: item.category || 'Academic',
          startDate: dateStr,
          time: '9:00 AM – 1:30 PM',
          venue: item.location || 'Main Campus Auditorium & Grounds',
          description: item.description || '',
          highlights: ['Keynote Addresses', 'Student Exhibits', 'Parent Interaction'],
          isUpcoming: item.startDate ? new Date(item.startDate) >= new Date() : true,
          registrationOpen: Boolean(item.registrationUrl),
        }
      })
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching events, using fallback:', err)
  }
  return SCHOOL_EVENTS
}

export async function getGallery() {
  try {
    const data = await client.fetch(GALLERY_ALBUMS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      const items: any[] = []
      data.forEach((album: any) => {
        if (album.images && Array.isArray(album.images) && album.images.length > 0) {
          album.images.forEach((img: any, idx: number) => {
            items.push({
              id: `${album._id}-${idx}`,
              title: img.caption || album.title,
              category: album.category || 'Campus & Architecture',
              imageUrl: img.url || album.coverImageUrl,
              alt: img.alt || album.title,
              caption: img.caption || album.description,
            })
          })
        } else if (album.coverImageUrl) {
          items.push({
            id: album._id,
            title: album.title,
            category: album.category || 'Campus & Architecture',
            imageUrl: album.coverImageUrl,
            alt: album.coverImageAlt || album.title,
            caption: album.description,
          })
        }
      })
      if (items.length > 0) return items
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching gallery, using fallback:', err)
  }
  return GALLERY_ITEMS
}

export async function getTestimonials() {
  try {
    const data = await client.fetch(TESTIMONIALS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        id: item._id,
        quote: item.quote,
        authorName: item.name,
        relationship: item.role || 'Parent',
        detail: item.detail || `${item.role || 'Community'} Member`,
        avatar: item.photoUrl,
        highlight: item.name,
      }))
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching testimonials, using fallback:', err)
  }
  return TESTIMONIALS
}

export async function getAdmissionsInfo() {
  try {
    const data = await client.fetch(ADMISSIONS_INFO_QUERY, {}, { next: { revalidate: 0 } })
    if (data && data.academicYear) {
      return {
        academicYear: data.academicYear || SCHOOL_CONFIG.admissionsSession,
        process: (data.process && data.process.length > 0) ? data.process : ADMISSION_STEPS,
        faqs: ADMISSION_FAQS,
      }
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching admissionsInfo, using fallback:', err)
  }
  return {
    academicYear: SCHOOL_CONFIG.admissionsSession,
    process: ADMISSION_STEPS,
    faqs: ADMISSION_FAQS,
  }
}

export async function getFAQs() {
  try {
    const data = await client.fetch(FAQS_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        question: item.question,
        answer: item.answer,
        category: item.category || 'Admissions',
      }))
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching FAQs, using fallback:', err)
  }
  return ADMISSION_FAQS
}

export async function getStudentLife() {
  try {
    const data = await client.fetch(STUDENT_LIFE_QUERY, {}, { next: { revalidate: 0 } })
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        id: item._id,
        title: item.title,
        category: item.category || 'Activities',
        description: item.description || '',
        image: item.featuredImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
      }))
    }
  } catch (err) {
    console.warn('[Sanity] Error fetching studentLife, using fallback:', err)
  }
  return []
}

