import { useState, useMemo } from 'react'
import { recipes, HEALTH_GOALS, HEALTH_LABEL_MAP } from '../data'
import RecipeCard from '../components/RecipeCard'

const ALL_FILTERS = [
  { id: 'all', label: 'All Recipes' },
  ...HEALTH_GOALS.map(g => ({ id: g.id, label: g.label })),
]

export default function Feed({ healthGoals, onRecipeClick, onDieticianClick }) {
  const [activeFilter, setActiveFilter] = useState(
    healthGoals && healthGoals.length > 0 ? healthGoals[0] : 'all'
  )

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return recipes
    return recipes.filter(r => r.healthLabels.includes(activeFilter))
  }, [activeFilter])

  const goalLabel = HEALTH_GOALS.find(g => g.id === activeFilter)

  return (
    <div>
      <div className="feed-header">
        <div className="feed-logo">
          <span>recipes for her</span>
          Nuri Recipes
        </div>
        <span style={{ fontSize: 22 }}>🌿</span>
      </div>

      {activeFilter !== 'all' && goalLabel && (
        <div className="feed-greeting">
          Recipes for {goalLabel.label.toLowerCase()} {goalLabel.icon}
        </div>
      )}

      <div className="filter-scroll">
        {ALL_FILTERS.map(f => (
          <button
            key={f.id}
            className={`filter-chip ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="recipe-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌱</div>
            <div className="empty-title">No recipes yet</div>
            <div className="empty-text">
              Our dieticians are working on recipes for this category. Check back soon!
            </div>
          </div>
        ) : (
          filtered.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRecipeClick={onRecipeClick}
              onDieticianClick={onDieticianClick}
            />
          ))
        )}
      </div>
    </div>
  )
}
