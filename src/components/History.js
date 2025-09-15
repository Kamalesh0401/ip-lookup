import React from 'react';
import { clearHistory } from '../utils/storage';

export default function History({ list = [], onSelect, onClearLocal }) {
    return (
        <aside className="card history-card">
            <div className="history-header">
                <h3>History</h3>
                <div className="history-actions">
                    <button className="btn-ghost" onClick={() => {
                        const text = list.map(i => i.ip).join('\n');
                        if (navigator.clipboard) navigator.clipboard.writeText(text);
                    }}>Copy All</button>
                    <button className="btn-ghost" onClick={() => { clearHistory(); if (onClearLocal) onClearLocal(); }}>Clear</button>
                </div>
            </div>

            {list.length === 0 ? (
                <div className="empty">No past lookups yet. Try a search.</div>
            ) : (
                <ul className="history-list">
                    {list.map((it) => (
                        <li key={it.ip} className="history-row">
                            <button className="history-btn" onClick={() => onSelect(it.ip)}>{it.ip}</button>
                            <div className="history-meta">{it.city ? `${it.city}, ${it.country}` : it.country || ''} • {new Date(it.timestamp || it.at || Date.now()).toLocaleString()}</div>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}
