// api.js

// Provider configs (no API key required for basic endpoints; for production use API keys)
const PROVIDERS = [
    {
        name: "ipinfo",
        url: (ip = "") =>
            ip ? `https://ipinfo.io/${ip}/json` : `https://ipinfo.io/json`,
        transform: (d) => ({
            ip: d.ip || "",
            city: d.city || "",
            region: d.region || "",
            country: d.country || "",
            loc: d.loc || "", // "lat,long"
            org: d.org || "",
            postal: d.postal || "",
            timezone: d.timezone || "",
            hostname: d.hostname || "",
            raw: d,
            privacy: {
                vpn: d?.privacy?.vpn || false,
                proxy: d?.privacy?.proxy || false,
                tor: d?.privacy?.tor || false,
                hosting: d?.privacy?.hosting || false,
            },
        }),
    },
    {
        name: "ipapi",
        // ipapi returns /json/ for current, or /{ip}/json/ for ip
        url: (ip = "") =>
            ip ? `https://ipapi.co/${ip}/json/` : `https://ipapi.co/json/`,
        transform: (d) => ({
            ip: d.ip || "",
            city: d.city || "",
            region: d.region || "",
            country: d.country_name || d.country || "",
            country_code: d.country_code || "",
            loc:
                d.latitude && d.longitude ? `${d.latitude},${d.longitude}` : "",
            org: d.org || d.asn || "",
            postal: d.postal || d.zip || "",
            timezone: d.timezone || "",
            hostname: d.hostname || "",
            raw: d,
            privacy: {
                vpn: d?.security?.vpn || false,
                proxy: d?.security?.proxy || false,
                tor: d?.security?.tor || false,
                hosting: false,
            },
        }),
    },
];

const TIMEOUT = 10000;

// helper: timeout wrapper for fetch
function fetchWithTimeout(resource, options = {}) {
    const { timeout = TIMEOUT } = options;

    return Promise.race([
        fetch(resource, { ...options, headers: { Accept: "application/json" } }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        ),
    ]);
}

export async function lookupIP(ip = "") {
    const sanitized = (ip || "").trim();

    for (const p of PROVIDERS) {
        const url = p.url(sanitized);
        try {
            const res = await fetchWithTimeout(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (data) {
                const normalized = p.transform(data);
                return { ...normalized, provider: p.name, timestamp: Date.now() };
            }
        } catch (err) {
            // console.warn("Provider failed", p.name, err?.message);
            continue;
        }
    }

    throw new Error("All providers failed or returned invalid data.");
}
