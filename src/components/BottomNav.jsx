export default function BottomNav({ current, onChange }) {
  const items = [
    { id: 'feed', icon: '✦', label: 'Feed' },
    { id: 'explore', icon: '⊹', label: 'Explore' },
    { id: 'saved', icon: '◇', label: 'Saved' },
    { id: 'profile', icon: '○', label: 'You' },
  ]

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button
          key={item.id}
          className={`nav-item ${current === item.id ? 'active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
