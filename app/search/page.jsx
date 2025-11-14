"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import DPECard from "../../components/DPECard";

export default function SearchPage() {
  const [airport, setAirport] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function runSearch(e) {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const baseRef = collection(db, "dpe_profiles");

      const filters = [];
      if (airport) {
        filters.push(
          where("location.airport", "==", airport.toUpperCase())
        );
      }
      if (city) {
        filters.push(where("location.city", "==", city));
      }
      if (state) {
        filters.push(
          where("location.state", "==", state.toUpperCase())
        );
      }

      let qRef;

      if (filters.length > 0) {
        // When we are filtering, just use filters.
        // No orderBy -> no composite index required.
        qRef = query(baseRef, ...filters);
      } else {
        // No filters: show newest first.
        qRef = query(baseRef, orderBy("createdAt", "desc"));
      }

      const snap = await getDocs(qRef);
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setResults(docs);
    } catch (err) {
      console.error(err);
      alert("Error running search: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Load all DPEs on first page load
  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h1>Search DPEs</h1>

      <form onSubmit={runSearch} style={{ marginBottom: 16 }}>
        <div>
          <input
            style={{ width: "100%", marginBottom: 8 }}
            placeholder="Airport (e.g. KFTW)"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ width: "100%", marginBottom: 8 }}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ width: "100%", marginBottom: 8 }}
            placeholder="State (e.g. TX)"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {results.length === 0 && !loading && <p>No DPEs found.</p>}

      {results.map((dpe) => (
        <DPECard key={dpe.id} dpe={dpe} />
      ))}
    </div>
  );
}
