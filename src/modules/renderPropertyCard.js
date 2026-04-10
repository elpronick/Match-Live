export function renderPropertyCard(property) {
  const metaItems = property.meta
    .map((item) => `<li>${item}</li>`)
    .join('')

  const perkItems = property.perks
    .map((item) => `<span>${item}</span>`)
    .join('')

  return `
    <article class="property-card" data-id="${property.id}">
      <div class="property-card__media" style="--card-image: ${property.image}">
        <span class="property-card__tag">${property.tag}</span>
      </div>

      <div class="property-card__body">
        <div class="property-card__heading">
          <div>
            <p class="property-card__location">${property.location}</p>
            <h2 class="property-card__title">${property.title}</h2>
          </div>
          <p class="property-card__price">${property.price}</p>
        </div>

        <p class="property-card__description">${property.description}</p>

        <ul class="property-card__meta">${metaItems}</ul>

        <div class="property-card__chips">${perkItems}</div>
      </div>
    </article>
  `
}
