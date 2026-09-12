import { useReveal } from '../lib/useReveal'

// CSS transitions rather than framer-motion's `initial`, which rendered every
// heading at opacity 0 in the prerendered HTML. See lib/useReveal.
const EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)'

export default function TextReveal({ text, as = 'h2', className, style, delay = 0, ...props }: any) {
  const Tag = as as any
  const { ref, phase } = useReveal<HTMLSpanElement>()
  const visible = phase !== 'hidden'
  return (
    <Tag className={className} style={{ display: 'inline-flex', overflow: 'hidden', ...style }} {...props}>
      <span
        ref={ref}
        style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(15px)',
          transition:
            phase === 'revealing'
              ? `opacity 0.55s ${EASE} ${delay}s, transform 0.55s ${EASE} ${delay}s`
              : undefined,
        }}
      >
        {text}
      </span>
    </Tag>
  )
}
