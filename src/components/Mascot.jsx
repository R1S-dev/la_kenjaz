export default function Mascot({
  className = "",
  decorative = true,
  ...props
}) {
  return (
    <img
      src="/mascot.webp"
      className={`mascot ${className}`}
      alt={decorative ? "" : "Nasmejana LA KENJAZ maskota"}
      aria-hidden={decorative || undefined}
      width="400"
      height="400"
      draggable="false"
      {...props}
    />
  );
}
