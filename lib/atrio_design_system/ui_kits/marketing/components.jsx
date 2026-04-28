/* global React */
const { useState } = React;

function NavBar() {
  return (
    <nav className="nav">
      <div className="nav__brand">
        <img src="../../assets/atrio-isotipo-negro.png" alt=""/>
        <span className="nav__word">atrio</span>
      </div>
      <div className="nav__links">
        <a href="#red">La red</a>
        <a href="#como">Cómo funciona</a>
        <a href="#brokers">Para brokers</a>
        <a href="#manifesto">Manifiesto</a>
      </div>
      <button className="nav__cta">Solicitar acceso →</button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__kicker">Solo por invitación · AMM · Monterrey</div>
      <h1 className="hero__title">Tu red de propiedades de alto nivel, a un mensaje de WhatsApp.</h1>
      <p className="hero__sub">Inventario compartido entre 50 brokers serios del Área Metropolitana de Monterrey. Búsquedas por WhatsApp, en lenguaje natural. Sinergias reales.</p>
      <div className="hero__ctas">
        <button className="btn--primary">Solicitar acceso →</button>
        <button className="btn--ghost">Ver manifiesto</button>
      </div>
    </section>
  );
}

function StatStrip() {
  return (
    <section className="strip">
      <div>
        <div className="stat__kicker">Brokers</div>
        <div className="stat__num">50</div>
        <div className="stat__label">Serios. Invitados uno a uno. Ticket alto.</div>
      </div>
      <div>
        <div className="stat__kicker">Inventario</div>
        <div className="stat__num">1</div>
        <div className="stat__label">Un solo pool. Todos suben, todos buscan.</div>
      </div>
      <div>
        <div className="stat__kicker">Grupos saturados</div>
        <div className="stat__num">0</div>
        <div className="stat__label">Nunca más un PDF perdido entre 300 mensajes.</div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="como">
      <div className="section__kicker">Cómo funciona</div>
      <h2 className="section__title">Sin apps nuevas. Sin dashboards. Solo WhatsApp.</h2>
      <p className="section__lede">La red es invisible por diseño. La IA es el motor, no el protagonista.</p>
      <div className="steps">
        <div>
          <div className="step__n">01</div>
          <div className="step__title">Subes tu inventario.</div>
          <div className="step__body">Un PDF, una foto, una descripción. Lo que tengas. Queda estructurado y visible para los otros 49 brokers.</div>
        </div>
        <div>
          <div className="step__n">02</div>
          <div className="step__title">Buscas como le hablarías a un colega.</div>
          <div className="step__body">"Tres recámaras en Valle, abajo de ocho millones." La IA entiende, la red responde.</div>
        </div>
        <div>
          <div className="step__n">03</div>
          <div className="step__title">Cierras con comisión compartida.</div>
          <div className="step__body">Si hay match con tu cliente, te pasamos contacto del broker que captó. Ustedes cierran.</div>
        </div>
      </div>
    </section>
  );
}

function BrokerInviteCard() {
  return (
    <div className="invite">
      <div className="invite__head">
        <img src="../../assets/atrio-isotipo-cal.png" alt=""/>
        <span>atrio</span>
      </div>
      <div>
        <div className="invite__body">Mariana, te invitamos a una red de 50 brokers del AMM.</div>
      </div>
      <div className="invite__meta">
        Solo por invitación · Ticket alto<br/>
        useatrio.com · Abril 2026
      </div>
    </div>
  );
}

function PitchCard() {
  return (
    <div className="pitch">
      <img className="pitch__spiral" src="../../assets/atrio-isotipo-negro.png" alt=""/>
      <div className="pitch__q">
        "Lo que los grupos de WhatsApp prometían pero no podían cumplir."
      </div>
      <div className="pitch__foot">
        <span>Pitch · 10s</span>
        <span>Monterrey 2026</span>
      </div>
    </div>
  );
}

function SocialPost() {
  return (
    <div className="social">
      <div className="social__top">Inventario compartido. Sinergias reales. Solo por invitación.</div>
      <div className="social__bot">
        <img src="../../assets/atrio-isotipo-negro.png" alt=""/>
        <span>useatrio.com</span>
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="section" id="manifesto">
      <div className="section__kicker">Manifiesto</div>
      <h2 className="section__title">Los brokers que entendieron que el futuro ya llegó.</h2>
      <div className="card-row">
        <BrokerInviteCard/>
        <PitchCard/>
      </div>
      <SocialPost/>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot__brand">
        <img src="../../assets/atrio-isotipo-negro.png" alt=""/>
        <span>atrio</span>
      </div>
      <div className="foot__meta">
        useatrio.com · useatrio.ai<br/>
        Monterrey, N.L. · v1.2 · Abril 2026
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="site">
      <NavBar/>
      <Hero/>
      <StatStrip/>
      <HowItWorks/>
      <Manifesto/>
      <Footer/>
    </div>
  );
}

Object.assign(window, { NavBar, Hero, StatStrip, HowItWorks, BrokerInviteCard, PitchCard, SocialPost, Manifesto, Footer, App });
