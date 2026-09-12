import { useReveal } from '../lib/useReveal'

// CSS transitions rather than framer-motion's `initial`, which rendered every
// wrapped element at opacity 0 in the prerendered HTML. See lib/useReveal.
const EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)'

export default function ScrollReveal({
  children,
  className,
  style,
  direction = 'up',
  delay = 0,
  distance = 24,
  ...props
}: any) {
  const { ref, phase } = useReveal<HTMLDivElement>('-40px')
  const offset = direction === 'up' ? distance : direction === 'down' ? -distance : 0
  const visible = phase !== 'hidden'
  return (
    <div
      ref={ref}
      className={className}
      {...props}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${offset}px)`,
        transition:
          phase === 'revealing'
            ? `opacity 0.5s ${EASE} ${delay}s, transform 0.5s ${EASE} ${delay}s`
            : style?.transition,
      }}
    >
      {children}
    </div>
  )
}
