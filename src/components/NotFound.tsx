type Props = {
  title?: string
  message?: string
}

export default function NotFound({
  title = '404 Page Not Found',
  message = 'The page you are looking for does not exist or has been moved.',
}: Props) {
  return (
    <main style={{ padding: '160px 24px', textAlign: 'center', minHeight: '80vh', color: '#2B2B2B' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>{title}</h1>
      <p>{message}</p>
      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ color: '#3152B9', fontWeight: 600 }}>
          Go to the homepage
        </a>
      </p>
    </main>
  )
}
