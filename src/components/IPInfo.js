import React from 'react';

function CopyButton({ text }) {
    if (!navigator.clipboard) return null;
    return (
        <button className="btn-small" onClick={() => navigator.clipboard.writeText(text)}>
            Copy
        </button>
    );
}

export default function IPInfo({ data }) {
    if (!data) return null;

    const { ip, city, region, country, loc, org, postal, timezone, hostname, privacy, provider, raw } = data;

    function privacySummary(privacy) {
        if (!privacy) return 'Unknown';
        if (privacy.vpn || privacy.proxy || privacy.tor) return 'Yes — detected';
        if (privacy.hosting) return 'Possible hosting';
        return 'No';
    }

    return (
        <section className="card info-card" aria-live="polite">
            <div className="info-top">
                <div className="ip-block">
                    <h2 className="ip">{ip || '—'}</h2>
                    <div className="location">{[city, region, country].filter(Boolean).join(', ')}</div>
                </div>
                <div className="info-actions">
                    <CopyButton text={ip || ''} />
                </div>
            </div>

            <dl className="info-grid">
                <div className="info-item"><dt>ISP / Org</dt><dd>{org || '—'}</dd></div>
                <div className="info-item"><dt>Lat,Long</dt><dd>{loc || '—'}</dd></div>
                <div className="info-item"><dt>Postal</dt><dd>{postal || '—'}</dd></div>
                <div className="info-item"><dt>Timezone</dt><dd>{timezone || '—'}</dd></div>
                <div className="info-item"><dt>Hostname</dt><dd>{hostname || '—'}</dd></div>
                <div className="info-item"><dt>VPN / Proxy</dt><dd>{privacySummary(privacy)}</dd></div>
                <div className="info-item"><dt>Provider</dt><dd>{provider || '—'}</dd></div>
            </dl>

            <details className="raw">
                <summary>Raw JSON</summary>
                <pre>{JSON.stringify(raw, null, 2)}</pre>
            </details>
        </section>
    );
}
