
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/FVlr6rMUPeLIjE4H7MYfTx?s=cl&p=a&iam=2";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Player",
    location: "",
    jersey: "Later",
    note: "",
    consent: false,
    website: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  function update(field, value) {
    setForm(previous => ({
      ...previous,
      [field]: value
    }));
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
      setMessage("Please agree to the membership registration terms.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Registration failed."
        );
      }

      setRegistrationId(result.registrationId || "");

      setMessage(
        "Registration submitted successfully!"
      );

      setRegistrationSuccess(true);

      setForm({
        name: "",
        phone: "",
        type: "Player",
        location: "",
        jersey: "Later",
        note: "",
        consent: false,
        website: ""
      });

    } catch (error) {
      setMessage(
        error.message ||
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* Navigation */}
      <nav className="nav">
        <h2>KCC<span>.</span></h2>
        <a href="#join">JOIN THE CLUB</a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <p className="eyebrow">
          KUMMALLOOR • EST. 2026
        </p>

        <h1>
          MORE THAN<br />
          JUST A GAME.
        </h1>

        <p className="intro">
          One village. One cricket community.
          A place for everyone who loves cricket.
        </p>

        <a className="primary" href="#join">
          BECOME A MEMBER ↗
        </a>
      </section>

      {/* Community */}
      <section className="content">
        <p className="eyebrow">OUR COMMUNITY</p>

        <h2>Cricket brings us together.</h2>

        <p>
          Players and supporters are welcome.
          Join friendly matches, support our team
          and help build cricket in Kummalloor.
        </p>
      </section>

      {/* Membership */}
      <section className="content dark">
        <p className="eyebrow">MEMBERSHIP</p>

        <h2>Simple. Affordable. Local.</h2>

        <h3>
          ₹100 <small>/ month</small>
        </h3>

        <p>
          No joining fee. Every player and supporter
          contributes ₹100 monthly. Jersey is optional
          and can be purchased separately.
        </p>
      </section>

      {/* Registration */}
      <section className="content" id="join">
        <p className="eyebrow">JOIN KCC</p>

        <h2>Be part of the team.</h2>

        <p>
          Complete the registration form and join
          our WhatsApp community.
        </p>

        <form
          className="registration-form"
          onSubmit={submitForm}
        >
          <label>Full name</label>

          <input
            required
            value={form.name}
            onChange={e =>
              update("name", e.target.value)
            }
            placeholder="Your full name"
          />

          <label>WhatsApp number</label>

          <input
            required
            type="tel"
            inputMode="numeric"
            maxLength="10"
            value={form.phone}
            onChange={e =>
              update(
                "phone",
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="10-digit mobile number"
          />

          <label>Membership type</label>

          <select
            value={form.type}
            onChange={e =>
              update("type", e.target.value)
            }
          >
            <option value="Player">Player</option>
            <option value="Supporter">
              Cricket supporter
            </option>
          </select>

          <label>Locality</label>

          <input
            required
            value={form.location}
            onChange={e =>
              update("location", e.target.value)
            }
            placeholder="Your locality in or around Kummalloor"
          />

          <label>Jersey preference</label>

          <select
            value={form.jersey}
            onChange={e =>
              update("jersey", e.target.value)
            }
          >
            <option value="Yes">Interested now</option>
            <option value="Later">Maybe later</option>
            <option value="No">Not interested</option>
          </select>

          <label>Message (optional)</label>

          <textarea
            rows="3"
            value={form.note}
            onChange={e =>
              update("note", e.target.value)
            }
            placeholder="Anything you want the committee to know?"
          />

          <label className="consent">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={e =>
                update("consent", e.target.checked)
              }
            />

            I agree that the club committee may
            contact me about my registration.
          </label>

          {/* Spam protection honeypot */}
          <div className="honeypot" aria-hidden="true">
            <label>Leave this field empty</label>

            <input
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={e =>
                update("website", e.target.value)
              }
            />
          </div>

          <button
            className="primary submit-button"
            disabled={loading}
            type="submit"
          >
            {loading
              ? "SUBMITTING..."
              : "SUBMIT REGISTRATION ↗"}
          </button>

          {message && (
            <p
              className="form-message"
              role="status"
            >
              {message}
            </p>
          )}

          {/* WhatsApp invitation after successful registration */}
          {registrationSuccess && (
            <div className="whatsapp-invite">
              <h3>Welcome to KCC!</h3>

              <p>
                Your registration has been received.
              </p>

              {registrationId && (
                <p>
                  <strong>
                    Registration ID: {registrationId}
                  </strong>
                </p>
              )}

              <p>
                Join our WhatsApp group to connect
                with KCC players and supporters.
              </p>

              <a
                className="primary submit-button"
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                JOIN KCC WHATSAPP GROUP ↗
              </a>

              <p className="form-note">
                Remember: Every member must pay
                ₹100 monthly. Your membership and
                club benefits become active after
                the committee verifies your payment.
              </p>
            </div>
          )}
        </form>

        <p className="form-note">
          Submitting this form does not automatically
          activate your membership. Membership is
          confirmed after payment verification.
        </p>
      </section>

      {/* Footer */}
      <footer>
        KUMMALLOOR CRICKET CLUB © 2026
      </footer>
    </main>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
