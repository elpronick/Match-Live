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
          <button class="chip is-active" type="button">Centro</button>
          <button class="chip" type="button">Terraza</button>
          <button class="chip" type="button">Mascotas</button>
          <button class="chip" type="button">Parking</button>
        </div>

        <div class="filters-panel__stats">
          <article class="stat-card">
            <span>Presupuesto</span>
            <strong>Hasta 600 EUR</strong>
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
            class="swipe-button swipe-button--reject swipe-button--icon"
            id="back-btn"
            type="button"
            aria-label="Volver a la habitacion anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button class="swipe-button swipe-button--save" id="save-btn" type="button">
            Guardar
          </button>
          <button
            class="swipe-button swipe-button--like swipe-button--icon"
            id="next-btn"
            type="button"
            aria-label="Ir a la siguiente habitacion"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  </div>
`

const backButton = document.querySelector('#back-btn')
const saveButton = document.querySelector('#save-btn')
const nextButton = document.querySelector('#next-btn')

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

saveButton.addEventListener('click', () => {
  swipeController.swipe('save')
  syncActionButtons()
})

nextButton.addEventListener('click', () => {
  swipeController.goNext()
  syncActionButtons()
})

syncActionButtons()
