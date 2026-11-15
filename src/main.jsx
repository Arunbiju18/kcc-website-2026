
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/FVlr6rMUPeLIjE4H7MYfTx?s=cl&p=a&iam=2";

function App() {
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
          <a href="#community" onClick={closeMenu}>COMMUNITY</a>
          <a href="#players" onClick={closeMenu}>PLAYERS</a>
          <a href="#membership" onClick={closeMenu}>MEMBERSHIP</a>
          <a href="#join" onClick={closeMenu} className="mobile-nav-join">
            JOIN KCC ↗
          </a>
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
            KUMMALLOOR · KERALA · EST. 2026
          </div>

          <p className="hero-eyebrow">THE HOME OF LOCAL CRICKET</p>

          <h1>
            THIS IS<br />
            <span>OUR GAME.</span>
          </h1>

          <p className="hero-description">
            Bringing cricket lovers together.
          </p>

          <div className="hero-actions">
            <a href="#join" className="primary">
              BECOME A MEMBER <span>↗</span>
            </a>

            <a href="#about" className="secondary-link">
              EXPLORE THE CLUB <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>ONE CLUB. ONE COMMUNITY.</span>
          <span>PLAY · CONNECT · GROW</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="intro-section" id="about">
        <div className="section-kicker">
          <span>01</span> WHO WE ARE
        </div>

        <div className="intro-grid">
          <div>
            <p className="intro-overline">BUILT AROUND THE GAME</p>

            <h2>
              A CLUB FOR<br />
              EVERYONE WHO<br />
              <span>LOVES CRICKET.</span>
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              Based in Kummalloor, we bring together people
              who share one passion — cricket.
            </p>

            <p>
              Whether you want to play, compete, support
              the team or simply be part of the community,
              there's a place for you here.
            </p>

            <a href="#join" className="text-link">
              FIND YOUR PLACE AT KCC ↗
            </a>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="community-section" id="community">
        <div className="section-kicker">
          <span>02</span> THE KCC COMMUNITY
        </div>

        <div className="community-heading">
          <div>
            <p className="section-overline">MORE THAN A TEAM</p>
            <h2>
              MORE THAN<br />
              <span>JUST MATCHES.</span>
            </h2>
          </div>

          <p>
            Cricket brings us together. The community
            keeps us connected.
          </p>
        </div>

        <div className="benefit-grid">
          <article className="benefit-card">
            <span className="benefit-number">01 / PLAY</span>
            <div className="benefit-icon">🏏</div>
            <h3>PLAY TOGETHER</h3>
            <p>
              Friendly matches, weekend cricket and
              opportunities to represent the club.
            </p>
            <span className="card-arrow">↗</span>
          </article>

          <article className="benefit-card">
            <span className="benefit-number">02 / CONNECT</span>
            <div className="benefit-icon">🤝</div>
            <h3>CONNECT TOGETHER</h3>
            <p>
              Meet players and supporters who share
              your passion for cricket.
            </p>
            <span className="card-arrow">↗</span>
          </article>

          <article className="benefit-card">
            <span className="benefit-number">03 / GROW</span>
            <div className="benefit-icon">🌱</div>
            <h3>GROW TOGETHER</h3>
            <p>
              Build friendships with players and supporters
              who share your passion.
            </p>
            <span className="card-arrow">↗</span>
          </article>
        </div>
      </section>

      {/* PLAYERS */}
      <section className="players-section" id="players">
        <div className="section-kicker">
          <span>03</span> THE KCC PLAYERS
        </div>

        <div className="players-heading">
          <div>
            <p className="section-overline">MEET THE TEAM</p>
            <h2>
              OUR<br />
              <span>PLAYERS.</span>
            </h2>
          </div>

          <p>
            Meet the people who make KCC a cricket community.
            Every player has a place in our story.
          </p>
        </div>

        {playersLoading ? (
          <p className="players-state">Loading player profiles...</p>
        ) : playersError ? (
          <p className="players-state players-error">{playersError}</p>
        ) : players.length === 0 ? (
          <p className="players-state">
            Player profiles will appear here soon.
          </p>
        ) : (
          <div className="players-grid">
            {players.map((player) => {
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
                  <div className="player-photo">
                    <span>{initials}</span>

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
                  </div>

                  <div className="player-details">
                    <span className="player-role">
                      {player.role || "Player"}
                    </span>

                    <h3>{name}</h3>

                    {player.battingStyle && (
                      <p>
                        <span>BAT</span>
                        {player.battingStyle}
                      </p>
                    )}

                    {player.bowlingStyle && (
                      <p>
                        <span>BOWL</span>
                        {player.bowlingStyle}
                      </p>
                    )}
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
          <span>03</span> MEMBERSHIP
        </div>

        <div className="membership-grid">
          <div className="membership-copy">
            <p className="membership-tag">YOUR CLUB. YOUR COMMUNITY.</p>

            <h2>
              ONE CLUB.<br />
              <span>ONE HUNDRED.</span>
            </h2>

            <p className="membership-description">
              Membership is open to cricket players
              and supporters from anywhere.
            </p>

            <a href="#join" className="text-link">
              BECOME PART OF KCC ↗
            </a>
          </div>

          <div className="price-card">
            <div className="price-card-top">
              <p>MONTHLY CONTRIBUTION</p>
              <span className="price-dot" />
            </div>

            <div className="price">
              ₹100 <small>/ month</small>
            </div>

            <div className="price-divider" />

            <ul>
              <li><span>✓</span> Join the KCC community</li>
              <li><span>✓</span> Participate in club activities</li>
              <li><span>✓</span> Stay informed about matches</li>
              <li><span>✓</span> Support local cricket</li>
            </ul>

            <p className="price-note">
              No joining fee. Jersey is optional and
              purchased separately.
            </p>

            <a href="#join" className="primary full-width">
              JOIN THE CLUB ↗
            </a>
          </div>
        </div>
      </section>

      {/* HOW MEMBERSHIP WORKS */}
      <section className="steps-section">
        <div className="section-kicker">
          <span>04</span> GET STARTED
        </div>

        <h2>
          THREE STEPS.<br />
          <span>ONE COMMUNITY.</span>
        </h2>

        <div className="steps-grid">
          <div className="step-item">
            <span>01</span>
            <h3>REGISTER</h3>
            <p>Complete the membership registration form.</p>
          </div>

          <div className="step-item">
            <span>02</span>
            <h3>CONNECT</h3>
            <p>Join the KCC WhatsApp community.</p>
          </div>

          <div className="step-item">
            <span>03</span>
            <h3>ACTIVATE</h3>
            <p>Pay ₹100 monthly and await committee verification.</p>
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="join-section" id="join">
        <div className="section-kicker">
          <span>05</span> REGISTRATION
        </div>

        <div className="join-grid">
          <div className="join-heading">
            <p className="section-overline">YOUR NEXT INNINGS STARTS HERE</p>

            <h2>
              YOUR<br />
              <span>CLUB.</span><br />
              YOUR GAME.
            </h2>

            <p>
              Take the first step. Register with KCC
              and become part of our cricket community.
            </p>

            <div className="join-highlight">
              <span className="join-highlight-mark">K</span>

              <div>
                <strong>KUMMALLOOR CRICKET CLUB</strong>
                <small>PLAY · CONNECT · GROW</small>
              </div>
            </div>
          </div>

          <form className="registration-form" onSubmit={submitForm}>
            <div className="form-heading">
              <div>
                <p className="form-overline">TAKE YOUR PLACE</p>
                <h3>MEMBER REGISTRATION</h3>
                <p>Fields marked * are required.</p>
              </div>

              <span className="form-number">KCC / 2026</span>
            </div>

            <label htmlFor="name">FULL NAME *</label>
            <input
              id="name"
              required
              maxLength="80"
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Enter your full name"
            />

            <label htmlFor="phone">WHATSAPP NUMBER *</label>
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

            <label htmlFor="type">MEMBERSHIP TYPE *</label>
            <select
              id="type"
              value={form.type}
              onChange={e => update("type", e.target.value)}
            >
              <option value="Player">Player</option>
              <option value="Supporter">Cricket supporter</option>
            </select>

            <label htmlFor="location">LOCALITY *</label>
            <input
              id="location"
              required
              value={form.location}
              onChange={e => update("location", e.target.value)}
              placeholder="Your locality"
            />

            <label htmlFor="jersey">JERSEY PREFERENCE</label>
            <select
              id="jersey"
              value={form.jersey}
              onChange={e => update("jersey", e.target.value)}
            >
              <option value="Yes">Interested now</option>
              <option value="Later">Maybe later</option>
              <option value="No">Not interested</option>
            </select>

            <label htmlFor="note">MESSAGE (OPTIONAL)</label>
            <textarea
              id="note"
              rows="3"
              maxLength="500"
              value={form.note}
              onChange={e => update("note", e.target.value)}
              placeholder="Anything you want the committee to know?"
            />

            <label className="consent">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => update("consent", e.target.checked)}
              />

              <span>
                I agree that the club committee may contact
                me about my registration.
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
                <p className="form-overline">REGISTRATION RECEIVED</p>
                <h3>WELCOME TO KCC!</h3>
                <p>Your registration has been received.</p>

                {registrationId && (
                  <p className="registration-id">
                    Registration ID: <strong>{registrationId}</strong>
                  </p>
                )}

                <p>
                  Connect with KCC players and supporters
                  through our WhatsApp group.
                </p>

                <a
                  className="primary full-width"
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  JOIN KCC WHATSAPP GROUP ↗
                </a>

                <p className="form-note">
                  Your official membership becomes active
                  only after the committee verifies your
                  ₹100 monthly contribution.
                </p>
              </div>
            )}

            <p className="form-note">
              Registration alone does not activate membership.
              Payment must be received and verified by the committee.
            </p>
          </form>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="closing-section">
        <p>THE GAME IS BETTER TOGETHER.</p>

        <h2>
          SEE YOU<br />
          <span>ON THE FIELD.</span>
        </h2>

        <a href="#join" className="primary">
          JOIN KCC TODAY ↗
        </a>

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

          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            WHATSAPP COMMUNITY ↗
          </a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 KUMMALLOOR CRICKET CLUB</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
