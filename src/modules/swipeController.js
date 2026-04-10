import { renderPropertyCard } from './renderPropertyCard.js'

export function createSwipeController({ properties, stackElement }) {
  let currentIndex = 0

  function renderEmptyState() {
    stackElement.innerHTML = `
      <div class="deck-section__empty">
        <div>
          <p class="section-label">No quedan cartas</p>
          <h2>Has revisado todos los pisos del feed.</h2>
          <p>La base esta lista para conectar filtros, favoritos o API mas adelante.</p>
        </div>
      </div>
    `
  }

  function renderCurrentCard() {
    if (currentIndex >= properties.length) {
      renderEmptyState()
      return
    }

    stackElement.innerHTML = renderPropertyCard(properties[currentIndex])
  }

  function swipe(action) {
    if (currentIndex >= properties.length) {
      return
    }

    stackElement.dataset.lastAction = action
    currentIndex += 1
    renderCurrentCard()
  }

  renderCurrentCard()

  return { swipe }
}
