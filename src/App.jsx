import { useState } from 'react'
import Welcome from './pages/Welcome'
import Onboarding from './pages/Onboarding'
import Feed from './pages/Feed'
import RecipeDetail from './pages/RecipeDetail'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'

export default function App() {
  const [screen, setScreen] = useState('welcome') // welcome | onboarding | app
  const [page, setPage] = useState('feed')         // feed | explore | saved | you
  const [healthGoals, setHealthGoals] = useState([])
  const [view, setView] = useState(null)           // { type: 'recipe'|'profile', data }
  const [followed, setFollowed] = useState(new Set())
  const [saved, setSaved] = useState(new Set())

  const navigate = (type, data) => {
    setView({ type, data })
    window.scrollTo(0, 0)
  }

  const goBack = () => {
    setView(null)
    window.scrollTo(0, 0)
  }

  const toggleFollow = (id) => {
    setFollowed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // WELCOME
  if (screen === 'welcome') {
    return (
      <div className="app-shell">
        <Welcome onStart={() => setScreen('onboarding')} />
      </div>
    )
  }

  // ONBOARDING
  if (screen === 'onboarding') {
    return (
      <div className="app-shell">
        <div className="page-content">
          <Onboarding
            onComplete={(goals) => {
              setHealthGoals(goals)
              setScreen('app')
            }}
          />
        </div>
      </div>
    )
  }

  // MAIN APP — detail views
  if (view) {
    if (view.type === 'recipe') {
      return (
        <div className="app-shell">
          <div className="page-content" style={{ paddingBottom: 0 }}>
            <RecipeDetail
              recipe={view.data}
              onBack={goBack}
              onDieticianClick={(d) => navigate('profile', d)}
              followed={followed.has(view.data.dieticianId)}
              onToggleFollow={toggleFollow}
            />
          </div>
        </div>
      )
    }

    if (view.type === 'profile') {
      return (
        <div className="app-shell">
          <div className="page-content" style={{ paddingBottom: 0 }}>
            <Profile
              dietician={view.data}
              onBack={goBack}
              onRecipeClick={(r) => navigate('recipe', r)}
              followed={followed.has(view.data.id)}
              onToggleFollow={toggleFollow}
            />
          </div>
        </div>
      )
    }
  }

  // MAIN APP — tab views
  const renderPage = () => {
    switch (page) {
      case 'feed':
        return (
          <Feed
            healthGoals={healthGoals}
            onRecipeClick={(r) => navigate('recipe', r)}
            onDieticianClick={(d) => navigate('profile', d)}
          />
        )
      case 'explore':
        return <ExploreTab onDieticianClick={(d) => navigate('profile', d)} followed={followed} onToggleFollow={toggleFollow} />
      case 'saved':
        return <SavedTab />
      case 'you':
        return <YouTab healthGoals={healthGoals} followed={followed} />
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <div className="page-content">
        {renderPage()}
      </div>
      <BottomNav current={page} onChange={setPage} />
    </div>
  )
}

// ── EXPLORE TAB ─────────────────────────────────────────────
import { dieticians, HEALTH_GOALS } from './data'

function ExploreTab({ onDieticianClick, followed, onToggleFollow }) {
  return (
    <div style={{ paddingBottom: 8 }}>
      <div style={{ padding: '52px 20px 8px' }}>
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 13, color: 'var(--tan)', marginBottom: 4 }}>discover</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontStyle: 'italic', color: 'var(--text)' }}>
          Our Dieticians
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 6, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
          Every recipe is posted by a registered & verified RD.
        </p>
      </div>

      <div style={{ padding: '8px 16px' }}>
        {dieticians.map(d => (
          <DieticianCard
            key={d.id}
            dietician={d}
            followed={followed.has(d.id)}
            onToggleFollow={onToggleFollow}
            onPress={() => onDieticianClick(d)}
          />
        ))}
      </div>
    </div>
  )
}

function DieticianCard({ dietician, followed, onToggleFollow, onPress }) {
  const focusGoals = dietician.tags.map(t => HEALTH_GOALS.find(g => g.id === t)).filter(Boolean)

  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        marginBottom: 12,
        boxShadow: 'var(--shadow)',
        cursor: 'pointer',
      }}
      onClick={onPress}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          className="avatar-lg"
          style={{ background: dietician.avatarColor }}
        >
          {dietician.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>
            {dietician.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--tan)', fontWeight: 500 }}>
            {dietician.credentials}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-light)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
            {dietician.specialty}
          </div>
        </div>
        <button
          className={`follow-btn ${followed ? 'following' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFollow(dietician.id) }}
        >
          {followed ? 'Following' : 'Follow'}
        </button>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-mid)', marginTop: 10, lineHeight: 1.5 }}>
        {dietician.bio}
      </p>

      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {focusGoals.map(g => (
          <span
            key={g.id}
            style={{
              padding: '3px 10px',
              background: g.color + '55',
              borderRadius: 50,
              fontSize: 11,
              color: 'var(--text-mid)',
            }}
          >
            {g.icon} {g.label}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-light)' }}>
        {(followed ? dietician.followers + 1 : dietician.followers).toLocaleString()} followers · {dietician.recipeIds.length} recipes
      </div>
    </div>
  )
}

// ── SAVED TAB ────────────────────────────────────────────────
function SavedTab() {
  return (
    <div className="empty-state" style={{ paddingTop: 80 }}>
      <div className="empty-icon">◇</div>
      <div className="empty-title">Nothing saved yet</div>
      <div className="empty-text">
        Tap the bookmark icon on any recipe to save it here for later.
      </div>
    </div>
  )
}

// ── YOU TAB ──────────────────────────────────────────────────
function YouTab({ healthGoals, followed }) {
  const goals = HEALTH_GOALS.filter(g => healthGoals.includes(g.id))

  return (
    <div style={{ padding: '52px 20px 20px' }}>
      <div style={{ fontFamily: 'var(--font-script)', fontSize: 13, color: 'var(--tan)', marginBottom: 4 }}>your space</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontStyle: 'italic', color: 'var(--text)', marginBottom: 24 }}>
        Your Profile
      </h1>

      {goals.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 10 }}>
            Your health focus
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {goals.map(g => (
              <span
                key={g.id}
                style={{
                  padding: '7px 14px',
                  background: g.color + '66',
                  borderRadius: 50,
                  fontSize: 13,
                  color: 'var(--text-mid)',
                }}
              >
                {g.icon} {g.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius)',
        padding: 16,
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 12 }}>
          Activity
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--text)' }}>
              {followed.size}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Following</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--text)' }}>0</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Saved</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--warm-beige)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--tan)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.5 }}>
          🩺 Are you a registered dietician? Apply to share your recipes on Nuri Recipes.
        </div>
        <button style={{
          marginTop: 10,
          padding: '8px 16px',
          background: 'transparent',
          border: '1.5px solid var(--brown)',
          borderRadius: 50,
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--brown)',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}>
          Apply to post recipes
        </button>
      </div>
    </div>
  )
}
