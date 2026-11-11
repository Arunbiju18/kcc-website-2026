
import React, { useState } from "react";
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

  function update(field, value) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

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

  return (
    <main className="site-shell">

      {/* NAVIGATION */}
      <nav className="nav">
        <a href="#home" className="brand">
          <span className="brand-mark">K</span>
          <span>
            <strong>KCC</strong>
            <small>KUMMALLOOR CRICKET CLUB</small>
          </span>
        </a>

        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#membership">MEMBERSHIP</a>
          <a href="#community">COMMUNITY</a>
        </div>

        <a className="nav-join" href="#join">
          JOIN KCC <span>↗</span>
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-label">
            <span className="live-dot" />
            KUMMALLOOR • EST. 2026
          </div>

          <h1>
            THIS IS<br />
            <span>OUR GAME.</span>
          </h1>

          <p className="hero-description">
            More than a cricket team. A community built
            around the game we love.
          </p>

          <div className="hero-actions">
            <a href="#join" className="primary">
              BECOME A MEMBER <span>↗</span>
            </a>
            <a href="#about" className="secondary-link">
              DISCOVER KCC ↓
            </a>
          </div>

          <div className="hero-bottom">
            <span>ONE VILLAGE. ONE COMMUNITY.</span>
            <span>KERALA, INDIA</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="intro-section" id="about">
        <div className="section-kicker">
          <span>01</span> WHO WE ARE
        </div>

        <div className="intro-grid">
          <h2>
            A CLUB FOR<br />
            EVERYONE WHO<br />
            <span>LOVES CRICKET.</span>
          </h2>

          <div className="intro-copy">
            <p>
              Kummalloor Cricket Club brings together people
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

        <h2>MORE THAN<br />JUST MATCHES.</h2>

        <div className="benefit-grid">
          <article className="benefit-card">
            <span className="benefit-number">01</span>
            <div className="benefit-icon">🏏</div>
            <h3>PLAY TOGETHER</h3>
            <p>
              Friendly matches, weekend cricket and
              opportunities to represent the club.
            </p>
          </article>

          <article className="benefit-card">
            <span className="benefit-number">02</span>
            <div className="benefit-icon">🏆</div>
            <h3>COMPETE TOGETHER</h3>
            <p>
              Build a competitive team and take part
              in tournaments.
            </p>
          </article>

          <article className="benefit-card">
            <span className="benefit-number">03</span>
            <div className="benefit-icon">🤝</div>
            <h3>GROW TOGETHER</h3>
            <p>
              Connect with local players and supporters
              who share your passion.
            </p>
          </article>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="membership-section" id="membership">
        <div className="section-kicker">
          <span>03</span> BECOME A MEMBER
        </div>

        <div className="membership-grid">
          <div>
            <p className="membership-tag">YOUR CLUB. YOUR COMMUNITY.</p>
            <h2>
              ONE CLUB.<br />
              <span>ONE HUNDRED.</span>
            </h2>
            <p className="membership-description">
              Membership is open to cricket players
              and supporters from Kummalloor.
            </p>
          </div>

          <div className="price-card">
            <p>MONTHLY CONTRIBUTION</p>
            <div className="price">
              ₹100 <small>/ month</small>
            </div>

            <div className="price-divider" />

            <ul>
              <li>✓ Join the KCC community</li>
              <li>✓ Participate in club activities</li>
              <li>✓ Stay informed about matches</li>
              <li>✓ Support local cricket</li>
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

      {/* REGISTRATION */}
      <section className="join-section" id="join">
        <div className="section-kicker">
          <span>04</span> REGISTRATION
        </div>

        <div className="join-grid">
          <div className="join-heading">
            <h2>
              YOUR<br />
              <span>CLUB.</span><br />
              YOUR GAME.
            </h2>

            <p>
              Take the first step. Register with KCC
              and become part of our cricket community.
            </p>

            <div className="join-info">
              <span>01</span>
              <p>Complete the registration form.</p>
              <span>02</span>
              <p>Join the WhatsApp community.</p>
              <span>03</span>
              <p>Pay ₹100 monthly and await verification.</p>
            </div>
          </div>

          <form className="registration-form" onSubmit={submitForm}>
            <div className="form-heading">
              <h3>MEMBER REGISTRATION</h3>
              <p>Fields marked * are required.</p>
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
              <p className="form-message" role="status">
                {message}
              </p>
            )}

            {registrationSuccess && (
              <div className="whatsapp-invite">
                <div className="success-icon">✓</div>
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
        <h2>SEE YOU<br /><span>ON THE FIELD.</span></h2>
        <a href="#join" className="primary">
          JOIN KCC TODAY ↗
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <a href="#home" className="brand footer-brand">
            <span className="brand-mark">K</span>
            <span>
              <strong>KCC</strong>
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
