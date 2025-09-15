import React, { useState } from 'react';

export default function IPLookupForm({ onLookup, loading }) {
    const [value, setValue] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLookup(value);
    }

    function quick(ip) {
        setValue(ip);
        onLookup(ip);
    }

    return (
        <section id="lookup" className="card lookup-card">
            <form className="form-row" onSubmit={handleSubmit}>
                <label htmlFor="ip-input" className="sr-only">Enter IP or domain (leave empty for current)</label>
                <input
                    id="ip-input"
                    className="text-input"
                    placeholder="Enter an IP (e.g. 8.8.8.8) or leave empty to check your IP"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Looking up…' : 'Lookup'}
                </button>
            </form>

            <div className="form-quick row">
                <button type="button" className="btn-ghost" onClick={() => quick('8.8.8.8')}>Try 8.8.8.8</button>
                <button type="button" className="btn-ghost" onClick={() => quick('1.1.1.1')}>Try 1.1.1.1</button>
                <button type="button" className="btn-ghost" onClick={() => quick('')}>My IP</button>
            </div>
        </section>
    );
}
