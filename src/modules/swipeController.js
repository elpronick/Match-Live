import { renderPropertyCard } from './renderPropertyCard.js'

export function createSwipeController({ properties, stackElement }) {
  let currentIndex = 0

  function getState() {
    return {
      currentIndex,
      total: properties.length,
      canGoBack: currentIndex > 0,
      canGoNext: currentIndex < properties.length - 1,
    }
  }

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
    if (currentIndex < properties.length - 1) {
      currentIndex += 1
    }
    renderCurrentCard()
  }

  function goNext() {
    if (currentIndex >= properties.length - 1) {
      return
    }

    stackElement.dataset.lastAction = 'next'
    currentIndex += 1
    renderCurrentCard()
  }

  function goBack() {
    if (currentIndex <= 0) {
      return
    }

    stackElement.dataset.lastAction = 'back'
    currentIndex -= 1
    renderCurrentCard()
  }

  renderCurrentCard()

  return {
    getState,
    goBack,
    goNext,
    swipe,
  }
}
