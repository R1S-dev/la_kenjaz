import { fmt } from "./analytics";
const FONT = "Arial, Helvetica, sans-serif";
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Maskota nije učitana."));
    img.src = src;
  });
export async function createShareCard(r) {
  const mascot = await loadImage("/mascot.webp");
  const c = document.createElement("canvas");
  c.width = 1080;
  c.height = 1920;
  const x = c.getContext("2d");
  if (!x) throw new Error("Izvoz nije dostupan.");
  x.fillStyle = "#f9f7f3";
  x.fillRect(0, 0, 1080, 1920);
  const text = (s, y, size = 30, color = "#493328", weight = 400) => {
    x.fillStyle = color;
    x.font = `${weight} ${size}px ${FONT}`;
    x.textAlign = "center";
    x.fillText(s, 540, y);
  };
  x.drawImage(mascot, 357, 95, 70, 70);
  x.fillStyle = "#493328";
  x.font = `800 46px ${FONT}`;
  x.textAlign = "left";
  x.fillText("la kenjaz.", 440, 147);
  x.fillStyle = "#eee3d3";
  x.beginPath();
  x.roundRect(60, 235, 960, 1260, 80);
  x.fill();
  x.save();
  x.globalAlpha = 0.2;
  [
    [98, 305, 100],
    [900, 540, 66],
    [100, 1100, 70],
    [890, 1190, 90],
    [800, 290, 50],
  ].forEach(([a, b, s]) => x.drawImage(mascot, a, b, s, s));
  x.restore();
  text("E pa, sranje.", 380, 30, "#9c8063", 600);
  text("Na WC-u sam proveo", 540, 38, "#977c62");
  let size = 330;
  x.font = `800 ${size}px ${FONT}`;
  const days = fmt(r.days);
  while (x.measureText(days).width > 830) {
    size -= 5;
    x.font = `800 ${size}px ${FONT}`;
  }
  text(days, 875, size, "#493328", 800);
  text("dana života.", 990, 66, "#493328", 700);
  text("Da. Celih dana.", 1070, 29, "#a58a70");
  x.fillStyle = "#d6c4ad";
  x.fillRect(150, 1165, 780, 2);
  text(`${fmt(r.hours)} sati sedenja`, 1260, 40, "#73563e", 600);
  text(`${fmt(r.phoneDays)} dana samo na telefonu.`, 1340, 30, "#9b8067");
  x.drawImage(mascot, 415, 1460, 250, 250);
  text("Život prolazi. Ja sedim.", 1770, 39, "#6c4934", 700);
  text("Svako sranje se računa.", 1835, 26, "#a18b76");
  return new Promise((resolve, reject) =>
    c.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Izvoz nije uspeo."))),
      "image/png",
    ),
  );
}
