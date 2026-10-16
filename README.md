# LA KENJAZ 2.0

Nova mobilna verzija: krem podloga, čokoladno braon paleta, jedan Arial/Helvetica font, zaobljene kartice i originalna cartoon maskota. React 18 + Vite + Tailwind CSS. Bez naloga, servera, praćenja ili API ključeva.

## Pokretanje

Instaliraj Node.js 22 LTS ili noviji. U ovom folderu:

```bash
npm ci
npm run dev
```

Windows: možeš pokrenuti i `POKRENI.bat`. Otvori adresu koju Vite ispiše.

## Produkcioni build i Vercel

```bash
npm test
npm run build
npm run preview
```

Na Vercelu izaberi Vite, build komandu `npm run build` i izlazni folder `dist`. Nema promenljivih okruženja. U paketu je i gotov `dist` za statički HTTPS hosting. Projekat se hostuje na korenu domena.

## Šta je novo

- Jednostavan početak: „Život prolazi. Ti sediš.“
- Tri numerička polja, veliki +/− tasteri i slider za telefon.
- Kratka animirana analiza sa maskotom.
- Veliki rezultat, udeo telefona, traka života, dva poređenja i stručni zaključak.
- Dodatni brojevi nalaze se pod „Još malo štete“.
- Originalna maskota na početku, u logotipu, ikonicama i karticama.
- Sitne animacije lebdenja, tačkica, otvaranja, brojeva i pritiska na dugme.
- Lokalno generisana 1080 × 1920 PNG kartica za Story, prilagođena novom stilu.
- Priprema kartice je odvojena od klika za sistemsko deljenje radi mobilnih pregledača.

## Struktura

- `src/App.jsx` — tok aplikacije, izveštaj i deljenje.
- `src/components/Mascot.jsx` — optimizovana maskota.
- `src/components/Icon.jsx` — male SVG ikone interfejsa.
- `src/components/NumberControl.jsx` — numerički unos.
- `src/components/Count.jsx` — brojevi koji se animiraju u vidljivom delu ekrana.
- `src/components/Modal.jsx` — modal sa fokusom, Escape i Tab podrškom.
- `src/analytics.js` — formule, validacija i zaključci.
- `src/share.js` — izvoz kartice direktno u Canvas.
- `src/style.css` — mobilni dizajn i animacije.
- `public/mascot.webp` — optimizovana maskota za aplikaciju.
- `public/icons/` — lokalne PNG ikone za PWA i iPhone.
- `design/mascot-original.png` — izvorna generisana maskota visoke rezolucije.
- `vite.config.js` — manifest i Workbox offline keš.

## PWA i offline

Service worker se generiše samo za produkciju. Za proveru pokreni build i preview, otvori aplikaciju online, sačekaj registraciju i osveži. Zatim isključi mrežu i osveži ponovo. Aplikacija, stilovi, skripte, maskota i ikonice su u offline kešu. Nema udaljenih fontova ili API poziva.

- iPhone: Safari → Podeli → Dodaj na početni ekran.
- Android / desktop: meni pregledača → Instaliraj aplikaciju.
- Potreban je HTTPS ili localhost; obična LAN HTTP adresa na telefonu nije dovoljan siguran kontekst za PWA.
- Dugme „Na tvoj telefon“ prikazuje sistemski dijalog gde je dostupan, a inače uputstvo.
- Bezlični resursi se keširaju, a lični unosi se ne pamte. Posle ponovnog otvaranja kreće se od podrazumevanih vrednosti.

## Računica

Godine × 365,25 × posete/dan × minuti/poseti. Telefon: ukupno minuta × procenat / 100. Mesec: 365,25 / 12 dana. Poređenja: film 120 minuta, noć 480 minuta, LOTR bioskopska trilogija 558 minuta i pesma 3,5 minuta. Navike se pretpostavljaju konstantnim tokom celog života. Aplikacija je za zabavu.

## Pristupačnost i provere

Veliki mobilni tasteri, oznake polja, tastaturna navigacija, fokus u modalu, poruke validacije, live obaveštenja, reduced-motion podrška i ErrorBoundary. Testovi pokrivaju računicu, nemoguće vrednosti i pragove zaključaka. Produkcioni build i manifest su provereni. Vizuelna provera u pregledaču i stvarna instalacija/deljenje na iPhone/Android uređajima nisu izvršeni u razvojnom okruženju; proveriti na HTTPS deploymentu.
