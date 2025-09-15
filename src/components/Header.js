import React from 'react';

export default function Header() {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <div className="brand">
                    <h1>IP Address Lookup</h1>
                    <p className="sub">Find your IP, location, ISP and privacy flags (VPN / Proxy)</p>
                </div>
                <nav className="nav-actions" aria-label="top actions">
                    <a className="btn-primary" href="#lookup">Lookup</a>
                </nav>
            </div>
        </header>
    );
}
