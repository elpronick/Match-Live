import React, { useState } from 'react';
import { ArrowLeft, Heart, Home, Lock, MessageCircle, Search, X } from 'lucide-react';
import { useDeck } from '../hooks/useDeck';
import ChatModal from './ChatModal';

export default function DeckSection() {
  const {
    people,
    currentIndex,
    likedIds,
    passedIds,
    showAllRooms,
    setShowAllRooms,
    loading,
    error,
    current,
    matches,
    roomsUnlocked,
    currentMatch,
    visibleRooms,
    hasHiddenRooms,
    handlePass,
    handleLike,
    handleBack,
    restartDemo,
  } = useDeck();

  const [selectedRoomForChat, setSelectedRoomForChat] = useState(null);

  return (
    <section className="deck-wrap" id="pisos" data-testid="deck-section">
      <div className="deck-wrap__header">
        <span className="deck-wrap__eyebrow">Primero personas, luego piso</span>
        <h2 className="deck-wrap__title" data-testid="deck-title">
          Conoce a tu futuro compi antes de buscar habitacion
        </h2>
        <p className="deck-wrap__subtitle">
          La busqueda de habitaciones se desbloquea cuando marcas un perfil con interes.
        </p>
      </div>

      <div className="deck-wrap__inner">
        <aside className="filters-panel" data-testid="filters-panel">
          <div className="filters-panel__block">
            <p className="filters-panel__label">Tu filtro humano</p>
            <h3 className="filters-panel__title">Compatibilidad antes que metros</h3>
            <p className="filters-panel__muted">
              Piensalo como elegir pareja para un trabajo en clase: primero miras si os entendeis,
              despues elegis la mesa donde sentaros.
            </p>
          </div>

          <div className="filters-panel__stats">
            <div className="stat-card">
              <span>Personas vistas</span>
              <strong>{likedIds.size + passedIds.size} de {people.length}</strong>
            </div>
            <div className="stat-card">
              <span>Matches</span>
              <strong>{matches.length} personas</strong>
            </div>
            <div className="stat-card">
              <span>Habitaciones</span>
              <strong>{roomsUnlocked ? 'Desbloqueadas' : 'Bloqueadas'}</strong>
            </div>
          </div>
        </aside>

        <div className="deck-main">
          <div className="roommate-flow">
            {error && <div className="auth-error">{error}</div>}

            {loading ? (
              <div className="deck-empty" data-testid="deck-loading">
                <h3>Cargando perfiles.</h3>
                <p>Estamos preguntando al backend que personas puede enseñarte.</p>
              </div>
            ) : current ? (
              <article className="property-card roommate-card" data-testid={`person-card-${current.id}`}>
                <div
                  className="property-card__media roommate-card__media"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(24,16,11,0.02), rgba(24,16,11,0.56)), url('${current.image}')`,
                  }}
                >
                  <span className="property-card__tag" data-testid="person-tag">
                    {current.tag}
                  </span>
                  <div className="roommate-card__summary">
                    <p>{current.city}</p>
                    <h3>{current.name}, {current.age}</h3>
                  </div>
                </div>

                <div className="property-card__body">
                  <div className="property-card__heading">
                    <div>
                      <p className="property-card__location">{current.lifestyle}</p>
                      <h3 className="property-card__name" data-testid="person-title">
                        {current.budget}
                      </h3>
                    </div>
                    <p className="property-card__price" data-testid="person-match-status">
                      {current.mutualInterest ? 'Puede haber match' : 'Interes pendiente'}
                    </p>
                  </div>

                  <p className="property-card__desc">{current.description}</p>
                  <div className="roommate-card__note">
                    <MessageCircle size={18} aria-hidden="true" />
                    <span>{current.lookingFor}</span>
                  </div>
                  <div className="property-card__chips">
                    {(current.traits || []).map((trait) => (
                      <span key={trait}>{trait}</span>
                    ))}
                  </div>
                </div>
              </article>
            ) : (
              <div className="deck-empty" data-testid="deck-empty">
                <h3>Has revisado todos los perfiles.</h3>
                <p>
                  Puedes reiniciar la demo para probar otra vez como se desbloquean las habitaciones.
                </p>
                <button className="swipe-btn swipe-btn--save" onClick={restartDemo} type="button">
                  Reiniciar demo
                </button>
              </div>
            )}

            <div className="swipe-actions" data-testid="swipe-actions">
              <button
                className="swipe-btn swipe-btn--back"
                onClick={handleBack}
                disabled={loading || currentIndex === 0}
                type="button"
                data-testid="swipe-back-btn"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                <span>Atras</span>
              </button>
              <button
                className="swipe-btn swipe-btn--reject"
                onClick={handlePass}
                disabled={loading || !current}
                type="button"
                data-testid="swipe-pass-btn"
              >
                <X size={18} aria-hidden="true" />
                <span>Pasar</span>
              </button>
              <button
                className="swipe-btn swipe-btn--like"
                onClick={handleLike}
                disabled={loading || !current}
                type="button"
                data-testid="swipe-like-btn"
              >
                <Heart size={18} aria-hidden="true" />
                <span>Me interesa</span>
              </button>
            </div>
          </div>

          <aside className={`rooms-panel ${roomsUnlocked ? 'is-unlocked' : ''}`} data-testid="rooms-panel">
            <div className="rooms-panel__header">
              <div>
                <p className="rooms-panel__eyebrow">
                  {roomsUnlocked ? 'Paso 2 desbloqueado' : 'Paso 2 bloqueado'}
                </p>
                <h3>Buscar habitacion</h3>
              </div>
              <span className="rooms-panel__status" aria-label={roomsUnlocked ? 'Desbloqueado' : 'Bloqueado'}>
                {roomsUnlocked ? <Home size={20} aria-hidden="true" /> : <Lock size={20} aria-hidden="true" />}
              </span>
            </div>

            {roomsUnlocked ? (
              <>
                <div className="match-banner" data-testid="match-banner">
                  <Heart size={18} aria-hidden="true" />
                  <span>
                    Hay match con {currentMatch?.name}. Ahora podeis mirar habitaciones compatibles.
                  </span>
                </div>
                <div className={`rooms-grid ${showAllRooms ? 'rooms-grid--expanded' : ''}`}>
                  {visibleRooms.map((room) => (
                    <article 
                      key={room.id} 
                      className="room-card" 
                      onClick={() => setSelectedRoomForChat(room)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="room-card__image" style={{ backgroundImage: `url('${room.image}')` }} />
                      <div className="room-card__body">
                        <p>{room.location}</p>
                        <h4>{room.title}</h4>
                        <strong>{room.price}</strong>
                      </div>
                    </article>
                  ))}
                </div>
                {hasHiddenRooms && (
                  <button
                    className="rooms-panel__more"
                    onClick={() => setShowAllRooms((isShowing) => !isShowing)}
                    type="button"
                    aria-expanded={showAllRooms}
                  >
                    {showAllRooms ? 'MOSTRAR MENOS' : 'MOSTRAR MAS'}
                  </button>
                )}
              </>
            ) : (
              <div className="locked-state" data-testid="rooms-locked-state">
                <Search size={34} aria-hidden="true" />
                <h4>Aun no puedes buscar habitacion</h4>
                <p>
                  Marca un perfil con Me interesa. Igual que abrir una puerta con una llave,
                  ese clic desbloquea las habitaciones compatibles.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>

      {selectedRoomForChat && (
        <ChatModal 
          room={selectedRoomForChat} 
          partner={currentMatch} 
          onClose={() => setSelectedRoomForChat(null)} 
        />
      )}
    </section>
  );
}
