// Blog covers and award images stay PNG/JPG on disk because social networks
// need that format for share cards (og:image). Pages display the WebP copy
// generated next to each file instead, which is a fraction of the size.
const HAS_WEBP_TWIN = /^\/(blog-cover-images|awards)\/[^/]+\.(png|jpe?g)$/i

export function displayImage(src: string | null | undefined): string {
  if (!src) return ''
  return HAS_WEBP_TWIN.test(src) ? src.replace(/\.(png|jpe?g)$/i, '.webp') : src
}
