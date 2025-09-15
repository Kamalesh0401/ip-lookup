const KEY = 'ip_lookup_history_v1';
const MAX = 50;

export function saveHistory(item) {
    try {
        const current = getHistory();
        const dedup = current.filter(x => x.ip !== item.ip);
        const newHist = [item, ...dedup].slice(0, MAX);
        localStorage.setItem(KEY, JSON.stringify(newHist));
    } catch (e) {
        console.warn('Failed to save history', e);
    }
}

export function getHistory() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function clearHistory() {
    try {
        localStorage.removeItem(KEY);
    } catch { }
}
