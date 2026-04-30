import { HEALTH_LABEL_MAP, getDieticianById } from '../data'

export default function RecipeDetail({ recipe, onBack, onDieticianClick, followed, onToggleFollow }) {
  const dietician = getDieticianById(recipe.dieticianId)

  return (
    <div className="recipe-detail-page">
      <div
        className="recipe-detail-hero"
        style={{ background: recipe.gradient }}
      >
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="recipe-detail-emoji">{recipe.emoji}</span>
      </div>

      <div className="recipe-detail-card">
        <div className="recipe-detail-script">Recipe</div>
        <h1 className="recipe-detail-title">{recipe.title}</h1>
        <p className="recipe-detail-subtitle">{recipe.subtitle}</p>

        <div className="health-tags" style={{ marginBottom: 16 }}>
          {recipe.healthLabels.map(label => {
            const info = HEALTH_LABEL_MAP[label]
            if (!info) return null
            return (
              <span
                key={label}
                className="health-tag"
                style={{ background: info.color, color: info.text }}
              >
                {info.label}
              </span>
            )
          })}
        </div>

        <div className="recipe-detail-meta-row">
          <span className="meta-item">⏱ {recipe.prepTime} prep</span>
          <span className="meta-item">🔥 {recipe.cookTime} cook</span>
          <span className="meta-item">🍽 Serves {recipe.servings}</span>
        </div>

        <div className="recipe-detail-section">
          <div className="section-script">Ingredients</div>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="ingredient-item">{ing}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-detail-section">
          <div className="section-script">Instructions</div>
          <ol className="instruction-list">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="instruction-item">
                <span className="instruction-num">{i + 1}</span>
                <span className="instruction-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {recipe.note && (
          <div className="recipe-note">
            💡 {recipe.note}
          </div>
        )}
      </div>

      <div
        className="recipe-dietician-strip"
        onClick={() => onDieticianClick(dietician)}
      >
        <div
          className="avatar-lg"
          style={{ background: dietician.avatarColor }}
        >
          {dietician.initials}
        </div>
        <div className="dietician-strip-info">
          <div className="dietician-strip-name">{dietician.name}</div>
          <div className="dietician-strip-creds">
            {dietician.credentials} · {dietician.specialty}
          </div>
        </div>
        <button
          className={`follow-btn ${followed ? 'following' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFollow(dietician.id)
          }}
        >
          {followed ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  )
}
