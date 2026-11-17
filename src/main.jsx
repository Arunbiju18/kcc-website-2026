
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/FVlr6rMUPeLIjE4H7MYfTx?s=cl&p=a&iam=2";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const initialForm = {
    name: "",
    phone: "",
    type: "Player",
    location: "",
    jersey: "Later",
    note: "",
    consent: false,
    website: ""
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [players, setPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersError, setPlayersError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlayers() {
      try {
        const response = await fetch("/api/players");
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.players)) {
          throw new Error(result.message || "Unable to load players.");
        }

        if (active) {
          setPlayers(result.players);
        }
      } catch (error) {
        if (active) {
          setPlayersError(error.message || "Unable to load player profiles.");
        }
      } finally {
        if (active) {
          setPlayersLoading(false);
        }
      }
    }

    loadPlayers();

    return () => {
      active = false;
    };
  }, []);

  function update(field, value) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

  // EXISTING REGISTRATION LOGIC — PRESERVED
  async function submitForm(event) {
    event.preventDefault();

    setMessage("");
    setRegistrationSuccess(false);
    setRegistrationId("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!form.consent) {
      setMessage("Please agree to the registration terms.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Registration failed.");
      }

      setRegistrationId(result.registrationId || "");
      setMessage("Registration submitted successfully!");
      setRegistrationSuccess(true);
      setForm(initialForm);
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="site-shell">

      {/* NAVIGATION */}
      <nav className="nav">
        <a href="#home" className="brand" onClick={closeMenu}>
          <img
            src="/kcc-logo.png"
            alt="KCC Logo"
            className="brand-logo"
          />

          <span>
            <strong>KCC<span className="brand-period">.</span></strong>
            <small>KUMMALLOOR CRICKET CLUB</small>
          </span>
        </a>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>ABOUT</a>
          <a href="#membership" onClick={closeMenu}>MEMBERSHIP</a>
          <a href="#players" onClick={closeMenu}>SQUAD</a>

         
        </div>

        <a className="nav-join" href="#join">
          JOIN KCC <span>↗</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(previous => !previous)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-noise" />

        <div className="stadium-scene" aria-hidden="true">
          <div className="stadium-lights stadium-lights-left" />
          <div className="stadium-lights stadium-lights-right" />
          <div className="stadium-stands" />

          <div className="stadium-field">
            <div className="field-circle" />

            <div className="field-pitch">
              <div className="pitch-crease pitch-crease-top" />
              <div className="pitch-crease pitch-crease-bottom" />
              <div className="pitch-stumps" />
            </div>
          </div>

          <div className="stadium-ball" />
        </div>

        <div className="hero-content">
          <div className="hero-label">
            <span className="live-dot" />
            KUMMALLOOR · KERALA
          </div>

          <h1>
            BRINGING CRICKET<br />
            <span>LOVERS TOGETHER.</span>
          </h1>

          <p className="hero-eyebrow">
            WHERE MEMORIES ARE MADE
          </p>

          <p className="hero-description">
            Kummalloor's own cricket club. A place to play,
            connect and grow, with all skill levels welcome.
          </p>
          
        </div>

        <div className="hero-bottom">
          <span className="hero-side-label">
            OUR CLUB. OUR COMMUNITY.
          </span>

          <span className="hero-side-label">
            PLAY · CONNECT · GROW
          </span>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="intro-section" id="about">
        <div className="section-kicker">
          <span>01</span> OUR STORY
        </div>

        <div className="intro-grid">
          <div>
            <p className="intro-overline">
              BUILT AROUND THE GAME
            </p>

            <h2>
              MORE THAN<br />
              JUST A GAME.
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              Cricket has always been about more than runs
              and wickets. It's about friendships, teamwork,
              competition and the memories we create together.
            </p>

            <p>
              Kummalloor Cricket Club brings people together
              through a shared passion for cricket. Whether
              you want to play, support the team or simply be
              part of the community, there's a place for you here.
            </p>

            <p>
              From Kummalloor, built around a love for cricket.
            </p>
          </div>
        </div>
      </section>

      {/* OUR COMMUNITY */}
      <section className="community-section" id="community">
        <div className="section-kicker">
          <span>02</span> OUR COMMUNITY
        </div>

        <div className="community-heading">
          <div>

            <h2>
  A PLACE TO<br />
  <span>BELONG.</span>
</h2>
          </div>

          <p>
            You don't have to be a good player to be part of KCC.
            There's a place for everyone who loves cricket.
          </p>
        </div>

        <div className="benefit-grid">
          <article className="benefit-card">
            <span className="benefit-number">01 / PLAY</span>
            <div className="benefit-icon">🏏</div>

            <h3>PLAY</h3>

            <p>
              Practise, play friendly matches and get
              opportunities to represent KCC.
            </p>
          </article>

          <article className="benefit-card">
            <span className="benefit-number">02 / SUPPORT</span>
            <div className="benefit-icon">🤝</div>

            <h3>SUPPORT</h3>

            <p>
              Be part of the club, support its activities
              and share the excitement of cricket.
            </p>
          </article>

          <article className="benefit-card">
            <span className="benefit-number">03 / GROW</span>
            <div className="benefit-icon">🌱</div>

            <h3>GROW</h3>

            <p>
              Build friendships, develop your game and
              grow together as a community.
            </p>
          </article>
        </div>
      </section>

      {/* KCC SQUAD */}
      <section className="players-section" id="players">
        <div className="section-kicker">
          <span>03</span> THE KCC SQUAD
        </div>

        <div className="players-heading">
          <div>
            <p className="section-overline">
              OUR CRICKET FAMILY
            </p>

            <h2>
              MEET THE<br />
              <span>SQUAD.</span>
            </h2>
          </div>

          <div className="squad-intro">
            <p>
              Every player brings something different to the team.
              Get to know the members who make up the KCC squad.
            </p>

            <div className="squad-count">
              <strong>
                {players.length.toString().padStart(2, "0")}
              </strong>

              <span>SQUAD MEMBERS</span>
            </div>
          </div>
        </div>

        {playersLoading ? (
          <p className="players-state">
            Loading squad...
          </p>
        ) : playersError ? (
          <p className="players-state players-error">
            {playersError}
          </p>
        ) : players.length === 0 ? (
          <p className="players-state">
            The KCC squad will be announced soon.
          </p>
        ) : (
          <div className="players-grid">
            {players.map((player, index) => {
              const name = player.name || "KCC Player";

              const initials = name
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map(part => part[0])
                .join("")
                .toUpperCase();

              const photoFile = player.photoFile || "";

              const validPhoto =
                /^[a-zA-Z0-9 _-]+\.(jpg|jpeg|png|webp)$/i.test(photoFile);

              return (
                <article
                  className="player-card"
                  key={player.registrationId || name}
                >
                  <div className="player-card-header">
                    <span>KCC</span>
                    <span>
                      SQUAD / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="player-photo">
                    <span className="player-initials">
                      {initials}
                    </span>

                    {validPhoto && (
                      <img
                        src={`/players/photos/${encodeURIComponent(photoFile)}`}
                        alt={`${name} - KCC player`}
                        loading="lazy"
                        onError={event => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    )}

                    <span className="player-photo-watermark">
                      KCC
                    </span>
                  </div>

                  <div className="player-details">
                    <span className="player-role">
                      {player.role || "Player"}
                    </span>

                    <h3>{name}</h3>

                    <div className="player-info">
                      <p>
                        <span>BAT</span>
                        {player.battingStyle || "Not specified"}
                      </p>

                      {player.bowlingStyle && (
                        <p>
                          <span>BOWL</span>
                          {player.bowlingStyle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="player-card-footer">
                    <span>KUMMALLOOR CRICKET CLUB</span>
                    <span>2026</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* MEMBERSHIP */}
      <section className="membership-section" id="membership">
        <div className="section-kicker">
          <span>04</span> MEMBERSHIP
        </div>

        <div className="membership-grid">
  <div className="membership-copy">
    <h2>
      OUR CLUB.<br />
      <span>OUR COMMUNITY.</span>
    </h2>

            <p className="membership-description">
              Whether you want to play cricket or support
              the club, there's a place for you in KCC.
            </p>
          </div>

          <div className="price-card">
            <div className="price-card-top">
              <p>ACTIVE PLAYER CONTRIBUTION</p>
            </div>

            <div className="price">
              ₹100 <small>/ month</small>
            </div>

            <div className="price-divider" />

            <ul>
              <li>
                <span>✓</span>
                Participate in practices and friendly matches as organised
              </li>

              <li>
                <span>✓</span>
                Opportunities for tournament participation and team selection
              </li>

              <li>
                <span>✓</span>
                Access to the KCC WhatsApp community after registration
              </li>

              <li>
                <span>✓</span>
                Be part of club activities and the cricket community
              </li>
            </ul>

            <div className="price-divider" />

            <p className="price-note">
              <strong>Supporters:</strong> Contribution is voluntary.
              You can be part of KCC without playing.
            </p>

            <p className="price-note">
              No joining fee. Jersey is optional and purchased separately.
            </p>

          </div>
        </div>
      </section>

    {/* HOW TO JOIN */}
<section className="steps-section">
  <div className="section-kicker">
    <span>05</span> HOW TO JOIN
  </div>

        <div className="steps-grid">
          <div className="step-item">
            <span>01</span>

            <h3>REGISTER</h3>

            <p>
              Tell us a little about yourself and choose
              Player or Supporter.
            </p>
          </div>

          <div className="step-item">
            <span>02</span>

            <h3>CONNECT</h3>

            <p>
              After registration, join the KCC WhatsApp
              community using your confirmation screen.
            </p>
          </div>

          <div className="step-item">
            <span>03</span>

            <h3>GET CONFIRMED</h3>

            <p>
              The KCC team reviews your registration and
              shares membership contribution details through WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="join-section" id="join">
        <div className="section-kicker">
          <span>06</span> REGISTRATION
        </div>

        <div className="join-grid">
          <div className="join-heading">
            <p className="section-overline">
              YOUR NEXT INNINGS STARTS HERE
            </p>

            <h2>
              ONE<br />
              <span>GAME.</span><br />
              ONE FAMILY.
            </h2>

            <p>
              Interested in playing, supporting or simply
              being part of something built around cricket?
              Take your first step. Register your interest
              and let the KCC team guide you through the process.
            </p>
          </div>

          <form className="registration-form" onSubmit={submitForm}>
            <div className="form-heading">
              <div>
                <p className="form-overline">
                  TAKE YOUR PLACE
                </p>

                <h3>MEMBER REGISTRATION</h3>

                <p>Fields marked * are required.</p>
              </div>

              <span className="form-number">
                KCC / 2026
              </span>
            </div>

            <label htmlFor="name">
              FULL NAME *
            </label>

            <input
              id="name"
              required
              maxLength="80"
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Enter your full name"
            />

            <label htmlFor="phone">
              WHATSAPP NUMBER *
            </label>

            <input
              id="phone"
              required
              type="tel"
              inputMode="numeric"
              maxLength="10"
              value={form.phone}
              onChange={e =>
                update("phone", e.target.value.replace(/\D/g, ""))
              }
              placeholder="10-digit mobile number"
            />

            <label htmlFor="type">
              MEMBERSHIP TYPE *
            </label>

            <select
              id="type"
              value={form.type}
              onChange={e => update("type", e.target.value)}
            >
              <option value="Player">Player</option>
              <option value="Supporter">Cricket supporter</option>
            </select>

            <label htmlFor="location">
              LOCALITY *
            </label>

            <input
              id="location"
              required
              value={form.location}
              onChange={e => update("location", e.target.value)}
              placeholder="Your locality"
            />

            <label htmlFor="jersey">
              JERSEY PREFERENCE
            </label>

            <select
              id="jersey"
              value={form.jersey}
              onChange={e => update("jersey", e.target.value)}
            >
              <option value="Yes">Interested now</option>
              <option value="Later">Maybe later</option>
              <option value="No">Not interested</option>
            </select>

            <label htmlFor="note">
              MESSAGE (OPTIONAL)
            </label>

            <textarea
              id="note"
              rows="3"
              maxLength="500"
              value={form.note}
              onChange={e => update("note", e.target.value)}
              placeholder="Anything you want the KCC team to know?"
            />

            <label className="consent">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => update("consent", e.target.checked)}
              />

              <span>
                I agree that the KCC team may contact me
                about my registration.
              </span>
            </label>

            <div className="honeypot" aria-hidden="true">
              <label>Leave this field empty</label>

              <input
                tabIndex="-1"
                autoComplete="off"
                value={form.website}
                onChange={e => update("website", e.target.value)}
              />
            </div>

            <button
              className="primary submit-button"
              disabled={loading}
              type="submit"
            >
              {loading ? "SUBMITTING..." : "SUBMIT REGISTRATION ↗"}
            </button>

            {message && (
              <p
                className={`form-message ${registrationSuccess ? "is-success" : "is-error"}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            {registrationSuccess && (
              <div className="whatsapp-invite">
                <div className="success-icon">✓</div>

                <p className="form-overline">
                  REGISTRATION RECEIVED
                </p>

                <h3>YOU'RE ONE STEP CLOSER TO KCC!</h3>

                <p>
                  Your registration has been received.
                  Join the KCC WhatsApp community to stay
                  connected and receive club updates.
                </p>

                {registrationId && (
                  <p className="registration-id">
                    Registration ID: <strong>{registrationId}</strong>
                  </p>
                )}

                <a
                  className="primary full-width"
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  JOIN WHATSAPP COMMUNITY ↗
                </a>

                <p className="form-note">
                  The KCC team will review your registration
                  and share the applicable membership contribution
                  details through WhatsApp.
                </p>
              </div>
            )}

            {!registrationSuccess && (
              <p className="form-note">
                Your registration will be reviewed by the KCC team.
                Membership contribution details are shared through WhatsApp.
              </p>
            )}
          </form>
        </div>
      </section>

            
{/* FAQ */}
<section className="faq-section" id="faq">
  <div className="section-kicker">
    <span>07</span> FREQUENTLY ASKED QUESTIONS
  </div>

  <div className="faq-heading">
    <div>
      <p className="section-overline">
        EVERYTHING YOU NEED TO KNOW
      </p>
    </div>

    <p>
      A few helpful answers about joining, playing
      and being part of Kummalloor Cricket Club.
    </p>
  </div>

  <div className="faq-grid">
    <details className="faq-card">
      <summary>
        <span className="faq-number">01 / MEMBERSHIP</span>
        <h3>Who can join KCC?</h3>
        <span className="faq-toggle">+</span>
      </summary>
      <p>
        Anyone who loves cricket can join as a player
        or a cricket supporter.
      </p>
    </details>

    <details className="faq-card">
      <summary>
        <span className="faq-number">02 / EXPERIENCE</span>
        <h3>Do I need cricket experience?</h3>
        <span className="faq-toggle">+</span>
      </summary>
      <p>
        No. All skill levels are welcome, and new players
        are encouraged to join.
      </p>
    </details>

    <details className="faq-card">
      <summary>
        <span className="faq-number">03 / CONTRIBUTION</span>
        <h3>What is the monthly contribution?</h3>
        <span className="faq-toggle">+</span>
      </summary>
      <p>
        Active players contribute ₹100 per month.
        Supporter contributions are voluntary.
      </p>
    </details>

    <details className="faq-card">
      <summary>
        <span className="faq-number">04 / SUPPORTERS</span>
        <h3>Can I join without playing?</h3>
        <span className="faq-toggle">+</span>
      </summary>
      <p>
        Yes. Choose Cricket supporter in the registration
        form to be part of KCC without playing.
      </p>
    </details>

    <details className="faq-card">
      <summary>
        <span className="faq-number">05 / PRACTICE & MATCHES</span>
        <h3>When and where are practices and matches?</h3>
        <span className="faq-toggle">+</span>
      </summary>
      <p>
        Ground, practice timings and match updates are
        shared through the KCC WhatsApp community.
      </p>
    </details>

    <details className="faq-card">
      <summary>
        <span className="faq-number">06 / JERSEY</span>
        <h3>Is the KCC jersey compulsory?</h3>
        <span className="faq-toggle">+</span>
      </summary>
      <p>
        No. The jersey is optional and purchased separately.
      </p>
    </details>
  </div>
</section>
      {/* FINAL CALL TO ACTION */}
      <section className="closing-section">
        <p>THE GAME IS BETTER TOGETHER.</p>

        <h2>
          SEE YOU<br />
          <span>ON THE FIELD.</span>
        </h2>

        <div className="closing-decoration" aria-hidden="true" />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <a href="#home" className="brand footer-brand">
            <img
              src="/kcc-logo.png"
              alt="KCC Logo"
              className="brand-logo"
            />

            <span>
              <strong>KCC<span className="brand-period">.</span></strong>
              <small>KUMMALLOOR CRICKET CLUB</small>
            </span>
          </a>

          <p className="footer-location">
            KUMMALLOOR, KERALA
          </p>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 KUMMALLOOR CRICKET CLUB. ALL RIGHTS RESERVED.
          </p>

          <p>
            PLAY · CONNECT · GROW
          </p>

          <a href="#home">
            BACK TO TOP ↑
          </a>
        </div>

        <p className="footer-privacy">
          Information submitted through this website is used
          by the KCC team for membership processing and club
          communication.
        </p>
      </footer>

             </footer>
    </main>

    <a
      href="https://chat.whatsapp.com/FVlr6rMUPeLIjE4H7MYfTx"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join KCC WhatsApp group"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 .5A15.5 15.5 0 0 0 2.6 23.8L.5 31.5l7.9-2.1A15.5 15.5 0 1 0 16 .5Zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.7 12.7 0 1 1 16 28.8Zm7-9.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7-.1-.2-.9-2.1-1.3-2.8-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.3s1.4 3.8 1.6 4.1c.2.3 2.8 4.3 6.8 6 1 .4 1.7.7 2.3.8 1 .3 1.9.3 2.6.2.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"
        />
      </svg>
    </a>
  );
}

createRoot(document.getElementById("root")).render(<App />);
