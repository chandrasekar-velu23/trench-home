import { postsData } from './postsData'
import BlogClientLayout from './[slug]/BlogClientLayout'
import NotFound from '../components/NotFound'

export default function BlogPostRoute({ slug }: { slug: string }) {
  const post = postsData.find((p) => p.slug === slug)
  if (!post) {
    return <NotFound title="Article Not Found" message="The post you are looking for does not exist." />
  }
  const relatedPosts = postsData.filter((p) => p.slug !== slug).slice(0, 3)
  return <BlogClientLayout post={post} relatedPosts={relatedPosts} />
}
