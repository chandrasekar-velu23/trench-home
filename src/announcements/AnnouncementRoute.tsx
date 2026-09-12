import { announcementsData } from './announcementsData'
import AnnouncementDetailClient from './[slug]/AnnouncementDetailClient'
import NotFound from '../components/NotFound'

export default function AnnouncementRoute({ slug }: { slug: string }) {
  const item = announcementsData.find((a) => a.slug === slug)
  if (!item) {
    return (
      <NotFound
        title="Announcement Not Found"
        message="The announcement you are looking for does not exist."
      />
    )
  }
  return <AnnouncementDetailClient item={item} />
}
