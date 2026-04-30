import { HEALTH_LABEL_MAP, getDieticianById } from '../data'

export default function RecipeCard({ recipe, onRecipeClick, onDieticianClick }) {
  const dietician = getDieticianById(recipe.dieticianId)

  const handleDieticianClick = (e) => {
    e.stopPropagation()
    onDieticianClick(dietician)
  }

  return (
    <div className="recipe-card fade-up" onClick={() => onRecipeClick(recipe)}>
      <div className="recipe-card-image" style={{ background: recipe.gradient }}>
        <span className="recipe-emoji-large">{recipe.emoji}</span>
      </div>
      <div className="recipe-card-body">
        <div className="recipe-card-dietician" onClick={handleDieticianClick}>
          <div
            className="avatar-sm"
            style={{ background: dietician.avatarColor }}
          >
            {dietician.initials}
          </div>
          <div>
            <div className="dietician-name-sm">{dietician.name}</div>
            <div className="dietician-creds-sm">{dietician.credentials} · {dietician.specialty}</div>
          </div>
        </div>

        <div className="recipe-card-title">{recipe.title}</div>
        <div className="recipe-card-subtitle">{recipe.subtitle}</div>

        <div className="health-tags">
          {recipe.healthLabels.slice(0, 3).map(label => {
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

        <div className="recipe-card-meta">
          <span className="meta-item">⏱ {recipe.prepTime} prep</span>
          <span className="meta-item">🔥 {recipe.cookTime}</span>
          <span className="meta-item">🍽 {recipe.servings} servings</span>
        </div>
      </div>
    </div>
  )
}
