import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main>
      <nav className="nav">
        <h2>KCC<span>.</span></h2>
        <a href="#join">JOIN THE CLUB</a>
      </nav>

      <section className="hero">
        <p className="eyebrow">KUMMALLOOR • EST. 2026</p>
        <h1>MORE THAN<br />JUST A GAME.</h1>
        <p className="intro">
          One village. One cricket community. A place for everyone who loves cricket.
        </p>
        <a className="primary" href="#join">BECOME A MEMBER ↗</a>
      </section>

      <section className="content">
        <p className="eyebrow">OUR COMMUNITY</p>
        <h2>Cricket brings us together.</h2>
        <p>Players and supporters are welcome. Join friendly matches, support our team and help build cricket in Kummalloor.</p>
      </section>

      <section className="content dark">
        <p className="eyebrow">MEMBERSHIP</p>
        <h2>Simple. Affordable. Local.</h2>
        <h3>₹100 <small>/ month</small></h3>
        <p>No joining fee. Jersey is optional and can be purchased separately.</p>
      </section>

      <section className="content" id="join">
        <p className="eyebrow">JOIN KCC</p>
        <h2>Be part of the team.</h2>
        <p>Registration is subject to committee review. Submitting the form does not automatically make you a member.</p>
        <a className="primary" href="https://wa.me/" target="_blank" rel="noreferrer">CONTACT THE CLUB</a>
      </section>

      <footer>KUMMALLOOR CRICKET CLUB © 2026</footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
