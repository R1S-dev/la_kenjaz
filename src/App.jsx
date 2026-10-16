import { useCallback, useEffect, useRef, useState } from "react";
import {
  calculate,
  fmt,
  initialValues,
  shareText,
  validate,
  verdict,
} from "./analytics";
import Count from "./components/Count";
import NumberControl from "./components/NumberControl";
import Mascot from "./components/Mascot";
import Icon from "./components/Icon";
import Modal from "./components/Modal";
import { createShareCard } from "./share";
const statuses = [
  "Sabiramo sva sedenja.",
  "Uračunavamo „još pet minuta“.",
  "Proveravamo koliko je loše.",
  "Dobro. Imamo broj.",
];
function Confetti() {
  return (
    <div className="poop-confetti" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <Mascot key={i} style={{ "--i": i }} />
      ))}
    </div>
  );
}
export default function App() {
  const [screen, setScreen] = useState("home"),
    [values, setValues] = useState(initialValues),
    [error, setError] = useState(""),
    [status, setStatus] = useState(0),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [card, setCard] = useState(""),
    [modal, setModal] = useState(""),
    [install, setInstall] = useState(null),
    [details, setDetails] = useState(false),
    [copied, setCopied] = useState(false);
  const heading = useRef(null),
    errorRef = useRef(null),
    shareFile = useRef(null);
  const result = calculate(values);
  const closeModal = useCallback(() => {
    setModal("");
    setCard("");
  }, []);
  const go = useCallback((s) => {
    setScreen(s);
    setError("");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [screen]);
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstall(e);
    };
    const done = () => setInstall(null);
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", done);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", done);
    };
  }, []);
  useEffect(() => {
    if (screen !== "loading") return;
    const interval = setInterval(
        () => setStatus((n) => Math.min(n + 1, 3)),
        650,
      ),
      timeout = setTimeout(() => go("result"), 2700);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [screen, go]);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => {
      setNotice("");
      setCopied(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [notice]);
  useEffect(
    () => () => {
      if (card) URL.revokeObjectURL(card);
    },
    [card],
  );
  const update = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setError("");
  };
  const submit = (e) => {
    e.preventDefault();
    const message = validate(values);
    if (message) {
      setError(message);
      return;
    }
    setStatus(0);
    setDetails(false);
    go("loading");
  };
  // Generate the PNG first, then share from a new click to preserve iOS user activation.
  const prepareShare = async () => {
    setBusy(true);
    try {
      const blob = await createShareCard(result);
      shareFile.current = new File([blob], "la-kenjaz.png", {
        type: "image/png",
      });
      setCard(URL.createObjectURL(blob));
      setModal("share");
    } catch {
      setNotice("Kartica nije spremna. Pokušaj ponovo.");
    } finally {
      setBusy(false);
    }
  };
  const share = async () => {
    try {
      const file = shareFile.current;
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "LA KENJAZ",
          text: shareText(result),
        });
      } else setNotice("Dodirni „Sačuvaj sliku“ i dodaj je u svoju priču.");
    } catch (e) {
      if (e.name !== "AbortError")
        setNotice("Deljenje nije dostupno. Sačuvaj sliku ispod.");
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText(result));
      setCopied(true);
      setNotice("Kopirano. Sad je i zvanično.");
    } catch {
      setModal("copy");
    }
  };
  const installApp = async () => {
    if (install) {
      try {
        await install.prompt();
        setInstall(null);
      } catch {
        setModal("install");
      }
    } else setModal("install");
  };
  return (
    <div className={`app ${screen}`}>
      <header className="site-header">
        <button
          className="brand"
          aria-label="LA KENJAZ — početak"
          onClick={() => go("home")}
        >
          <Mascot />
          <span>
            la kenjaz<span className="brand-period">.</span>
          </span>
        </button>
        <button className="install-button" onClick={installApp}>
          <Icon name="phone" />
          <span>Na tvoj telefon</span>
        </button>
      </header>
      <main key={screen} className="screen-enter">
        {screen === "home" && (
          <section className="hero">
            <div className="hero-art">
              <div className="mascot-halo" />
              <Mascot className="hero-mascot" decorative={false} />
              <Mascot className="satellite satellite-one" />
              <Mascot className="satellite satellite-two" />
              <Mascot className="satellite satellite-three" />
              <span className="little-star star-one">✦</span>
              <span className="little-star star-two">✦</span>
              <span className="floating-label">ozbiljno sranje.</span>
            </div>
            <div className="pill">
              <span /> Malo podataka. Velika nužda.
            </div>
            <h1 ref={heading} tabIndex="-1">
              Život prolazi.
              <br />
              <span>Ti sediš.</span>
            </h1>
            <p className="hero-copy">
              Koliko si života proveo na WC-u?
              <br />
              Hajde da konačno saberemo sranja.
            </p>
            <button className="primary" onClick={() => go("calculator")}>
              Izračunaj štetu <Icon name="arrow" />
            </button>
            <div className="privacy">
              <Icon name="lock" /> Samo tvoji podaci. Samo tvoja sranja.
            </div>
            <div className="hero-bottom">
              <div className="mascot-stack">
                <Mascot />
                <Mascot />
                <Mascot />
              </div>
              <p>
                Za sve nas koji kažemo
                <br />
                <strong>„Evo, izlazim.“</strong>
              </p>
            </div>
          </section>
        )}
        {screen === "calculator" && (
          <section className="calculator narrow">
            <div className="page-top">
              <button
                className="icon-button"
                aria-label="Nazad na početak"
                onClick={() => go("home")}
              >
                <Icon name="back" />
              </button>
              <span>Brza analiza</span>
              <Mascot />
            </div>
            <h1 ref={heading} tabIndex="-1">
              Da čujemo.
              <br />
              <span>Koliko kenjaš?</span>
            </h1>
            <p className="intro">Iskreno. Ovde smo svi svoji.</p>
            <form onSubmit={submit} noValidate>
              <div className="input-card">
                <NumberControl
                  id="age"
                  label="Koliko imaš godina?"
                  hint="Staž na ovoj planeti."
                  number="01"
                  value={values.age}
                  onChange={(v) => update("age", v)}
                  min={1}
                  max={120}
                  unit="godina"
                />
                <NumberControl
                  id="sessions"
                  label="Koliko puta dnevno?"
                  hint="Tvoj prosečan broj poseta."
                  number="02"
                  value={values.sessions}
                  onChange={(v) => update("sessions", v)}
                  min={0.1}
                  max={20}
                  step={0.5}
                  unit="poseta"
                />
                <NumberControl
                  id="minutes"
                  label="Koliko traje poseta?"
                  hint="I ono „samo još malo“."
                  number="03"
                  value={values.minutes}
                  onChange={(v) => update("minutes", v)}
                  min={1}
                  max={180}
                  unit="minuta"
                />
              </div>
              <div className="phone-field">
                <div className="phone-heading">
                  <div>
                    <label htmlFor="phone">A telefon?</label>
                    <p>Koliko tog vremena skroluješ?</p>
                  </div>
                  <output htmlFor="phone">
                    {values.phone}
                    <small>%</small>
                  </output>
                </div>
                <input
                  id="phone"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={values.phone}
                  style={{ "--fill": `${values.phone}%` }}
                  onChange={(e) => update("phone", Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>Potpuni zen</span>
                  <span>Još jedan video</span>
                </div>
              </div>
              {error && (
                <p ref={errorRef} tabIndex="-1" className="error" role="alert">
                  {error}
                </p>
              )}
              <button className="primary">
                Izračunaj moju propast <Icon name="arrow" />
              </button>
              <p className="privacy">
                <Icon name="lock" /> Ništa se ne šalje. Ništa se ne pamti.
              </p>
            </form>
          </section>
        )}
        {screen === "loading" && (
          <section className="loading-screen" aria-busy="true">
            <div className="loading-art">
              <Mascot className="thinking-mascot" />
              <div className="thinking-dots">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="pill">Vrlo ozbiljna matematika</div>
            <h1 ref={heading} tabIndex="-1">
              Sranje se
              <br />
              <span>sabira.</span>
            </h1>
            <p className="loading-status" aria-live="polite">
              {statuses[status]}
            </p>
            <div className="loading-track">
              <span />
            </div>
            <p className="micro">Ovih par sekundi ti ne računamo.</p>
          </section>
        )}
        {screen === "result" && (
          <article className="results narrow">
            <div className="page-top">
              <button
                className="icon-button"
                aria-label="Izmeni podatke"
                onClick={() => go("calculator")}
              >
                <Icon name="back" />
              </button>
              <span>Tvoj mali veliki izveštaj</span>
              <Mascot />
            </div>
            <section className="result-card">
              <Confetti />
              <div className="pill">E pa, sranje.</div>
              <h1 ref={heading} tabIndex="-1">
                <span className="result-label">Na WC-u si proveo</span>
                <strong
                  className={`big-result ${fmt(result.days).length > 5 ? "long-number" : ""}`}
                >
                  <Count value={result.days} />
                </strong>
                <span className="days-label">dana života.</span>
              </h1>
              <p className="result-caption">Da. Celih dana.</p>
              <div className="result-equivalents">
                <div>
                  <strong>
                    <Count value={result.hours} />
                  </strong>
                  <span>sati sedenja</span>
                </div>
                <div>
                  <strong>
                    <Count value={result.months} decimals={1} />
                  </strong>
                  <span>meseci života</span>
                </div>
              </div>
            </section>
            <section className="phone-result">
              <div className="small-icon">
                <Icon name="phone" />
              </div>
              <div>
                <p>Od toga, na telefonu</p>
                <strong>
                  <Count value={result.phoneDays} /> dana.
                </strong>
                <span>Verovatno samo još jedan video.</span>
              </div>
              <Mascot />
            </section>
            <section className="life-card">
              <div className="life-title">
                <span>Tvoj život, ukratko.</span>
                <strong>
                  <Count value={result.percent} decimals={2} />%
                </strong>
              </div>
              <div
                className="life-bar"
                role="img"
                aria-label={`${fmt(result.percent, 2)} procenata života na WC-u`}
              >
                <i style={{ width: `${result.percent}%` }} />
              </div>
              <div className="chart-labels">
                <span>
                  <i /> Na WC-u
                </span>
                <span>Sve ostalo</span>
              </div>
            </section>
            <section className="comparisons">
              <h2>Mogao si i da...</h2>
              <div className="comparison-grid">
                {[
                  [
                    result.hours / 2,
                    "filmova pogledaš.",
                    "Dva sata po filmu.",
                    "film",
                  ],
                  [
                    result.hours / 8,
                    "noći prespavaš.",
                    "Osam sati čistog mira.",
                    "sleep",
                  ],
                ].map(([n, label, note, kind]) => (
                  <div className={`comparison ${kind}`} key={kind}>
                    <Mascot />
                    <strong
                      style={fmt(n).length > 7 ? { fontSize: 24 } : undefined}
                    >
                      <Count value={n} />
                    </strong>
                    <h3>{label}</h3>
                    <p>{note}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="verdict">
              <Mascot />
              <div>
                <span>Naše stručno mišljenje</span>
                <h2>{verdict(result.daily)}</h2>
              </div>
            </section>
            <button
              className="details-toggle"
              aria-expanded={details}
              aria-controls="more-stats"
              onClick={() => setDetails((d) => !d)}
            >
              Još malo štete{" "}
              <Icon name="down" className={details ? "rotated" : ""} />
            </button>
            {details && (
              <section id="more-stats" className="extra-stats screen-enter">
                <div>
                  <span>Ukupno poseta</span>
                  <strong>
                    <Count value={result.sessions} />
                  </strong>
                </div>
                <div>
                  <span>Ukupno minuta</span>
                  <strong>
                    <Count value={result.minutes} />
                  </strong>
                </div>
                <div>
                  <span>Godina na WC-u</span>
                  <strong>
                    <Count value={result.years} decimals={2} />
                  </strong>
                </div>
                <div>
                  <span>Prosečna poseta</span>
                  <strong>
                    {fmt(
                      values.minutes,
                      Number.isInteger(values.minutes) ? 0 : 1,
                    )}{" "}
                    min
                  </strong>
                </div>
                <div>
                  <span>LOTR trilogija (558 min)</span>
                  <strong>{fmt(Math.floor(result.minutes / 558))} puta</strong>
                </div>
                <div>
                  <span>Pesama (3,5 min)</span>
                  <strong>{fmt(Math.floor(result.minutes / 3.5))}</strong>
                </div>
              </section>
            )}
            <section className="share-section">
              <h2>
                Sranje je lepše
                <br />
                kad se podeli.
              </h2>
              <button
                className="primary"
                disabled={busy}
                onClick={prepareShare}
              >
                {busy ? "Pravimo tvoju karticu..." : "Podeli rezultat"}
                <Icon name="share" />
              </button>
              <button className="secondary" onClick={copy}>
                {copied ? "Kopirano" : "Kopiraj rezultat"}
                <Icon name={copied ? "check" : "copy"} />
              </button>
              <button className="text-button" onClick={() => go("calculator")}>
                <Icon name="reset" /> Ponovi analizu
              </button>
            </section>
            <p className="method">
              Navike računamo kao da su iste celog života. Godina ima 365,25
              dana. Brojke su približne, aplikacija je za zabavu. Život ide
              dalje.
            </p>
          </article>
        )}
      </main>
      <footer>
        <span>la kenjaz.</span>
        <p>Svako sranje se računa.</p>
        <Mascot />
      </footer>
      <div className="toast" role="status">
        {notice && (
          <>
            <Icon name="check" />
            {notice}
          </>
        )}
      </div>
      {modal && (
        <Modal
          title={
            modal === "share"
              ? "Spremno za priču."
              : modal === "copy"
                ? "Tvoje sranje, u tekstu."
                : "Uvek pri ruci."
          }
          onClose={closeModal}
        >
          {modal === "share" ? (
            <>
              <img
                className="share-preview"
                src={card}
                alt={`LA KENJAZ: ${fmt(result.days)} dana života na WC-u.`}
              />
              <button className="primary" onClick={share}>
                Podeli karticu <Icon name="share" />
              </button>
              <a className="secondary" href={card} download="la-kenjaz.png">
                Sačuvaj sliku <Icon name="down" />
              </a>
              <p className="modal-note">
                Za Instagram priču: sačuvaj sliku, pa je dodaj u priču.
              </p>
            </>
          ) : modal === "copy" ? (
            <>
              <p>Označi tekst ispod i kopiraj ga.</p>
              <textarea
                aria-label="Rezultat za kopiranje"
                readOnly
                value={shareText(result)}
                onFocus={(e) => e.target.select()}
              />
            </>
          ) : (
            <>
              <Mascot className="install-mascot" />
              <ol>
                <li>
                  <strong>iPhone</strong>
                  <span>
                    Otvori u Safariju → Podeli → Dodaj na početni ekran.
                  </span>
                </li>
                <li>
                  <strong>Android i računar</strong>
                  <span>
                    U meniju pregledača izaberi „Instaliraj aplikaciju“ ili
                    „Dodaj na početni ekran“.
                  </span>
                </li>
              </ol>
              <p className="modal-note">
                Posle prvog učitavanja radi i bez interneta. Sranje ne čeka
                signal.
              </p>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
