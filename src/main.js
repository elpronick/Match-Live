import './styles/main.scss'
import { properties } from './data/properties.js'
import { createSwipeController } from './modules/swipeController.js'

document.querySelector('#app').innerHTML = `
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="app-header__eyebrow">Tu proximo match inmobiliario</p>
        <h1>Descubre habitaciones como si hicieras swipe.</h1>
      </div>

      <button class="ghost-button" type="button">Filtros</button>
    </header>

    <main class="home-view">
      <aside class="filters-panel">
        <div class="filters-panel__block">
          <p class="section-label">Busqueda rapida</p>
          <h2>Personaliza tu feed</h2>
          <p class="muted-text">
            Base preparada para filtros, favoritos y recomendacion.
          </p>
        </div>

        <div class="filters-panel__chips">
          <button class="chip is-active" type="button" aria-pressed="true">
            Centro
          </button>
          <button class="chip" type="button" aria-pressed="false">Terraza</button>
          <button class="chip" type="button" aria-pressed="false">Mascotas</button>
          <button class="chip" type="button" aria-pressed="false">Parking</button>
        </div>

        <div class="filters-panel__stats">
          <article class="stat-card stat-card--budget">
            <span id="budget-label">Presupuesto</span>
            <div class="stat-card__budget">
              <span class="stat-card__budget-lead">Hasta</span>
              <div class="stat-card__budget-field">
                <input
                  id="budget-amount"
                  class="stat-card__budget-input"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="50000"
                  step="10"
                  value="600"
                  aria-labelledby="budget-label"
                />
                <span class="stat-card__currency" aria-hidden="true">€</span>
              </div>
            </div>
          </article>
          <article class="stat-card">
            <span>Interesados</span>
            <strong>12 personas</strong>
          </article>
        </div>
      </aside>

      <section class="deck-section" aria-live="polite">
        <div class="deck-section__stack" id="card-stack"></div>

        <div class="swipe-actions">
          <button
            class="swipe-button swipe-button--reject"
            id="back-btn"
            type="button"
          >
            Atrás
          </button>
          <button
            class="swipe-button swipe-button--save"
            id="save-btn"
            type="button"
            disabled
          >
            Guardar
          </button>
          <button
            class="swipe-button swipe-button--like"
            id="next-btn"
            type="button"
          >
            Siguiente
          </button>
        </div>
      </section>
    </main>
  </div>
`

const backButton = document.querySelector('#back-btn')
const nextButton = document.querySelector('#next-btn')
const filterChipsRoot = document.querySelector('.filters-panel__chips')

filterChipsRoot?.addEventListener('click', (event) => {
  const chip = event.target.closest('.chip')
  if (!chip || !filterChipsRoot.contains(chip)) return
  const selected = chip.classList.toggle('is-active')
  chip.setAttribute('aria-pressed', String(selected))
})

const swipeController = createSwipeController({
  properties,
  stackElement: document.querySelector('#card-stack'),
})

function syncActionButtons() {
  const { canGoBack, canGoNext } = swipeController.getState()

  backButton.disabled = !canGoBack
  nextButton.disabled = !canGoNext
}

backButton.addEventListener('click', () => {
  swipeController.goBack()
  syncActionButtons()
})

nextButton.addEventListener('click', () => {
  swipeController.goNext()
  syncActionButtons()
})

syncActionButtons()
