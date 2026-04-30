import { getRecipesByDietician, HEALTH_GOALS, HEALTH_LABEL_MAP } from '../data'
import RecipeCard from '../components/RecipeCard'

function formatFollowers(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export default function Profile({ dietician, onBack, onRecipeClick, followed, onToggleFollow }) {
  const dieticianRecipes = getRecipesByDietician(dietician.id)

  const focusLabels = dietician.tags.map(t => {
    const goal = HEALTH_GOALS.find(g => g.id === t)
    return goal ? `${goal.icon} ${goal.label}` : t
  })

  const gradients = [
    'linear-gradient(135deg, #F0E8DC, #DDD0BC)',
    'linear-gradient(135deg, #E8DDD5, #D4C8B8)',
    'linear-gradient(135deg, #DDE8D8, #C4D4BC)',
  ]

  return (
    <div className="profile-page">
      <div
        className="profile-header-bg"
        style={{ background: `linear-gradient(160deg, ${dietician.avatarColor}55, ${dietician.avatarColor}22)` }}
      >
        <button
          className="back-btn"
          style={{ top: 52, left: 16 }}
          onClick={onBack}
        >
          ←
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-avatar-row">
          <div
            className="avatar-xl"
            style={{ background: dietician.avatarColor }}
          >
            {dietician.initials}
          </div>
          <button
            className={`profile-follow-btn ${followed ? 'following' : ''}`}
            onClick={() => onToggleFollow(dietician.id)}
          >
            {followed ? '✓ Following' : '+ Follow'}
          </button>
        </div>

        <h1 className="profile-name">{dietician.name}</h1>
        <div className="profile-creds">{dietician.credentials}</div>
        <div className="profile-specialty">{dietician.specialty}</div>
        <p className="profile-bio">{dietician.bio}</p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-num">{formatFollowers(followed ? dietician.followers + 1 : dietician.followers)}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{dietician.following}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{dieticianRecipes.length}</span>
            <span className="stat-label">Recipes</span>
          </div>
        </div>

        <div className="profile-focus-tags">
          {focusLabels.map((label, i) => (
            <span key={i} className="profile-focus-tag">{label}</span>
          ))}
        </div>

        <div className="profile-section-title">Recipes</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {dieticianRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onRecipeClick={onRecipeClick}
            onDieticianClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
