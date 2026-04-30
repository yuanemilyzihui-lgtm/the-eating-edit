import { useState } from 'react'
import { HEALTH_GOALS } from '../data'

export default function Onboarding({ onComplete }) {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <div className="onboarding-step">Step 1 of 1</div>
        <h1 className="onboarding-title">What brings you here?</h1>
        <p className="onboarding-subtitle">
          Select all that feel relevant — we'll personalise your recipe feed.
        </p>
      </div>

      <div className="onboarding-grid">
        {HEALTH_GOALS.map((goal, i) => (
          <div
            key={goal.id}
            className={`goal-card ${selected.includes(goal.id) ? 'selected' : ''}`}
            style={{ animationDelay: `${i * 0.04}s` }}
            onClick={() => toggle(goal.id)}
          >
            <div
              className="goal-card-bg"
              style={{ background: goal.color }}
            />
            <div className="goal-icon-wrap">{goal.icon}</div>
            <div className="goal-label">{goal.label}</div>
            <div className="goal-desc">{goal.description}</div>
            <div className="goal-check">✓</div>
          </div>
        ))}
      </div>

      <div className="onboarding-footer">
        <button
          className="onboarding-btn"
          onClick={() => onComplete(selected)}
          disabled={selected.length === 0}
        >
          {selected.length === 0
            ? 'Select at least one'
            : `Show my personalised feed (${selected.length} selected)`}
        </button>
        <button className="onboarding-skip" onClick={() => onComplete([])}>
          Skip — show me everything
        </button>
      </div>
    </div>
  )
}
