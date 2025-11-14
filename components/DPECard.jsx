"use client";

import Link from "next/link";

export default function DPECard({ dpe }) {
  const location = dpe.location || {};
  const contact = dpe.contact || {};
  const checkrides = dpe.checkrides || [];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 4,
        padding: 12,
        marginBottom: 10,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 18 }}>{dpe.name}</h3>
      <p style={{ margin: "4px 0" }}>
        {location.airport} — {location.city}, {location.state}
      </p>

      {checkrides.length > 0 && (
        <p style={{ margin: "4px 0", fontSize: 14 }}>
          Checkrides: {checkrides.join(", ")}
        </p>
      )}

      {typeof dpe.rating === "number" && (
        <p style={{ margin: "4px 0", fontSize: 14 }}>
          Rating: {dpe.rating} / 5
        </p>
      )}

      <Link href={`/dpe/${dpe.id}`}>View details</Link>
    </div>
  );
}
