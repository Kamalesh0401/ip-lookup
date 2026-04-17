import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import IPLookupForm from "./components/IPLookupForm";
import IPInfo from "./components/IPInfo";
import History from "./components/History";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";

import { lookupIP } from "./services/ipService";
import {
  saveHistory,
  getHistory,
  clearHistory as clearHistoryStorage,
} from "./utils/storage";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  /* Initial Load */
  useEffect(() => {
    setHistory(getHistory());
    handleLookup();
  }, []);

  /* Main Lookup Function */
  const handleLookup = async (ip = "") => {
    setLoading(true);
    setError("");

    try {
      const result = await lookupIP(ip.trim());

      setIpData(result);

      const historyItem = {
        ip: result.ip || ip || "Unknown",
        city: result.city || "",
        country: result.country || "",
        timestamp: Date.now(),
      };

      saveHistory(historyItem);
      setHistory(getHistory());
    } catch (err) {
      setError(err?.message || "Unable to fetch IP details.");
      setIpData(null);
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  };

  /* Select from History */
  const handleHistorySelect = (ip) => {
    handleLookup(ip);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* Clear History */
  const handleClearHistory = () => {
    clearHistoryStorage();
    setHistory([]);
  };

  return (
    <div className="app-shell">
      {/* Background Effects */}
      <div className="bg-blur bg-one"></div>
      <div className="bg-blur bg-two"></div>

      {/* Header */}
      <Header />

      {/* Main Layout */}
      <main className="app-main container">
        {/* Left Content */}
        <section className="main-left">
          <IPLookupForm
            onLookup={handleLookup}
            loading={loading}
          />

          {/* Welcome State */}
          {firstLoad && !loading && !ipData && (
            <div className="welcome-card">
              <h2>🌍 Welcome to IP Lookup</h2>
              <p>
                Instantly discover location, ISP,
                timezone, hostname, privacy status,
                and more for any IP address.
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-card">
              <LoadingSpinner />
              <p>Fetching IP information...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <ErrorMessage message={error} />
          )}

          {/* Result */}
          {ipData && !loading && (
            <IPInfo data={ipData} />
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="main-right">
          <History
            list={history}
            onSelect={handleHistorySelect}
            onClearLocal={handleClearHistory}
          />
        </aside>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}