"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function DPEPage() {
  const [user, setUser] = useState(null);

  // --- form fields ---

  // 1) Name
  const [name, setName] = useState("");

  // 2) Location / contact info
  const [airport, setAirport] = useState("");     // e.g. KFTW
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // 3) Checkrides they can give (checkboxes -> array)
  const [crPrivate, setCrPrivate] = useState(false);
  const [crInstrument, setCrInstrument] = useState(false);
  const [crCommercial, setCrCommercial] = useState(false);
  const [crCFI, setCrCFI] = useState(false);
  const [crCFII, setCrCFII] = useState(false);
  const [crMEI, setCrMEI] = useState(false);

  // 4) Notes
  const [notes, setNotes] = useState("");

  // 5) Checkride gouge
  const [gouge, setGouge] = useState("");

  // 6) Rating (1–5)
  const [rating, setRating] = useState(5);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("You must be logged in to add a DPE.");
      return;
    }

    if (!name || !airport || !state) {
      setMessage("Please fill at least Name, Airport, and State.");
      return;
    }

    // build checkrides array from checkboxes
    const checkrides = [];
    if (crPrivate) checkrides.push("Private");
    if (crInstrument) checkrides.push("Instrument");
    if (crCommercial) checkrides.push("Commercial");
    if (crCFI) checkrides.push("CFI");
    if (crCFII) checkrides.push("CFII");
    if (crMEI) checkrides.push("MEI");

    try {
      await addDoc(collection(db, "dpe_profiles"), {
        name,
        location: {
          airport,
          city,
          state,
        },
        contact: {
          phone,
          email,
          website,
        },
        checkrides,          // array of strings
        notes,
        gouge,
        rating: Number(rating), // 1–5
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });

      setMessage("DPE saved to database ✅");

      // clear the form
      setName("");
      setAirport("");
      setCity("");
      setState("");
      setPhone("");
      setEmail("");
      setWebsite("");
      setCrPrivate(false);
      setCrInstrument(false);
      setCrCommercial(false);
      setCrCFI(false);
      setCrCFII(false);
      setCrMEI(false);
      setNotes("");
      setGouge("");
      setRating(5);
    } catch (err) {
      console.error(err);
      setMessage("Error saving DPE: " + err.message);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>Add a Designated Pilot Examiner</h1>
      <p style={{ marginBottom: 10 }}>
        Any logged-in user can add a DPE with structured info. Later we can add moderation and editing.
      </p>

      {!user && (
        <p style={{ color: "red" }}>
          You must be logged in to submit this form. Use the Login link above.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* 1) Name */}
        <h3>Name</h3>
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 2) Location / contact */}
        <h3>Location / Contact info</h3>
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Home airport (e.g. KFTW)"
          value={airport}
          onChange={(e) => setAirport(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="State (e.g. TX)"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 8 }}
          placeholder="Website (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        {/* 3) Checkrides */}
        <h3>Checkrides they can give</h3>
        <label>
          <input
            type="checkbox"
            checked={crPrivate}
            onChange={(e) => setCrPrivate(e.target.checked)}
          />
          {" "}Private
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={crInstrument}
            onChange={(e) => setCrInstrument(e.target.checked)}
          />
          {" "}Instrument
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={crCommercial}
            onChange={(e) => setCrCommercial(e.target.checked)}
          />
          {" "}Commercial
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={crCFI}
            onChange={(e) => setCrCFI(e.target.checked)}
          />
          {" "}CFI
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={crCFII}
            onChange={(e) => setCrCFII(e.target.checked)}
          />
          {" "}CFII
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={crMEI}
            onChange={(e) => setCrMEI(e.target.checked)}
          />
          {" "}MEI
        </label>
        <br />

        {/* 4) Notes */}
        <h3>Notes</h3>
        <textarea
          style={{ width: "100%", minHeight: 60, marginBottom: 8 }}
          placeholder="Any general notes about this DPE"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* 5) Checkride Gouge */}
        <h3>Checkride gouge</h3>
        <textarea
          style={{ width: "100%", minHeight: 80, marginBottom: 8 }}
          placeholder="What to expect on the checkride, typical questions, quirks, etc."
          value={gouge}
          onChange={(e) => setGouge(e.target.value)}
        />

        {/* 6) Rating */}
        <h3>Overall rating (1–5)</h3>
        <input
          type="number"
          min={1}
          max={5}
          style={{ width: 80, marginBottom: 12 }}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <br />
        <button type="submit">Save DPE</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
