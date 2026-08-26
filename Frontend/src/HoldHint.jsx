export default function HoldHint({ hint, target }) {
  if (!hint || hint.target !== target) return null

  return (
    <div
      key={hint.id}
      className="holdHint"
      role="status"
      aria-label="Press and hold this button"
    >
      <span className="holdHintText">Hold</span>
      <span className="holdHintArrow" aria-hidden="true">↓</span>
    </div>
  )
}
