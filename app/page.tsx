export default function Home() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "40px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            letterSpacing: "1px",
            margin: "10px 0",
          }}
        >
          AviRate
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#555",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          A community-driven place for pilots to share experiences with
          Designated Pilot Examiners. Find the right DPE, read checkride gouge,
          and leave honest, respectful feedback for other aviators.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <a
            href="/search"
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              background: "#0070f3",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            🔎 Find a DPE
          </a>
          <a
            href="/dpe"
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid #ccc",
              background: "white",
              color: "#333",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ➕ Add a DPE
          </a>
          <a
            href="/signup"
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              background: "#111827",
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ✈️ Join AviRate
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "15px" }}>
          What you can do on AviRate
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "14px 16px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Search by location</h3>
            <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
              Look up DPEs by airport, city, or state so you know who&apos;s
              available near your home base or checkride location.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "14px 16px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>See 1–5 star ratings</h3>
            <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
              Each DPE has a simple 1–5 star rating so you can quickly gauge
              other pilots&apos; experiences.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "14px 16px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Read checkride gouge</h3>
            <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
              See what other pilots say about how each examiner runs the ride,
              what they emphasize, and any quirks to be ready for.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "14px 16px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>
              Contribute to the community
            </h3>
            <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
              After your checkride, log in and add your own rating and notes to
              help future pilots choose the right DPE.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "15px" }}>
          How AviRate works
        </h2>
        <ol style={{ paddingLeft: "20px", color: "#555", fontSize: "0.95rem" }}>
          <li style={{ marginBottom: 6 }}>
            <strong>Create an account</strong> – sign up so you can add DPEs and
            leave ratings.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Search for examiners</strong> – use the Find DPEs page to
            see who operates near your airport or state.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Review your experience</strong> – after your checkride,
            share a fair, respectful review and gouge.
          </li>
          <li>
            <strong>Help other pilots</strong> – your feedback makes checkride
            planning more transparent for everyone.
          </li>
        </ol>
      </section>
    </main>
  );
}
