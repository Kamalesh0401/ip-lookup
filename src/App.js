import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import IPLookupForm from './components/IPLookupForm';
import IPInfo from './components/IPInfo';
import History from './components/History';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { lookupIP } from './services/ipService';
import { saveHistory, getHistory, clearHistory as clearHistoryStorage } from './utils/storage';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(getHistory());

  useEffect(() => {
    // initial load: lookup current ip
    lookup();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // sync history with storage
    try {
      localStorage.setItem('ip_lookup_history_v1', JSON.stringify(history));
    } catch { }
  }, [history]);

  async function lookup(ip = '') {
    setError('');
    setLoading(true);
    try {
      const result = await lookupIP(ip);
      setIpData(result);
      // Save simple history object
      const item = {
        ip: result.ip || ip || 'unknown',
        city: result.city || '',
        country: result.country || '',
        timestamp: Date.now()
      };
      saveHistory(item);
      setHistory(getHistory());
    } catch (err) {
      setError(err?.message || 'Lookup failed');
      setIpData(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectHistory(ip) {
    lookup(ip);
  }

  function handleClearLocal() {
    setHistory([]);
    clearHistoryStorage();
  }

  return (
    <div className="app-root">
      <Header />

      <main className="container main-grid">
        <div className="left-col">
          <IPLookupForm onLookup={lookup} loading={loading} />
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          <IPInfo data={ipData} />
        </div>

        <div className="right-col">
          <History list={history} onSelect={handleSelectHistory} onClearLocal={handleClearLocal} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
