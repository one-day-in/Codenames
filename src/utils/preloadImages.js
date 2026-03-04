function toAbsoluteUrl(rawUrl) {
    if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) return null;
    try {
        const absolute = new URL(rawUrl, window.location.href);
        if (absolute.origin !== window.location.origin) return null;
        return absolute.href;
    } catch {
        return null;
    }
}

function collectUrlsFromCss() {
    const urls = new Set();
    const urlRegex = /url\((['"]?)(.*?)\1\)/g;

    for (const sheet of Array.from(document.styleSheets)) {
        let rules;
        try {
            rules = sheet.cssRules;
        } catch {
            continue;
        }
        if (!rules) continue;

        for (const rule of Array.from(rules)) {
            const cssText = rule.cssText || '';
            let match;
            while ((match = urlRegex.exec(cssText)) !== null) {
                const href = toAbsoluteUrl(match[2]);
                if (href) urls.add(href);
            }
        }
    }

    return urls;
}

function collectUrlsFromDom(root) {
    const urls = new Set();
    if (!root) return urls;

    root.querySelectorAll('img[src]').forEach(img => {
        const href = toAbsoluteUrl(img.getAttribute('src'));
        if (href) urls.add(href);
    });

    return urls;
}

function preloadOne(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';

        const done = () => resolve();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });

        img.src = url;
        if (img.complete) {
            if (img.decode) {
                img.decode().catch(() => {}).finally(resolve);
            } else {
                resolve();
            }
        }
    });
}

export async function preloadVisualImages(root) {
    const urls = new Set([
        ...collectUrlsFromDom(root),
        ...collectUrlsFromCss(),
    ]);

    if (!urls.size) return;
    await Promise.all(Array.from(urls).map(preloadOne));
}

