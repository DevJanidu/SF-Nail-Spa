import { business } from "@/lib/data";

/** Google Maps embed (keyless `output=embed`) + directions link. */
export default function MapEmbed() {
  return (
    <div>
      <div
        style={{
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <iframe
          title={`Map to ${business.name}`}
          src={`https://maps.google.com/maps?q=${business.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="360"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        className="btn btn-secondary"
        style={{ marginTop: "1rem" }}
        href={`https://www.google.com/maps/dir/?api=1&destination=${business.mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Directions →
      </a>
    </div>
  );
}
