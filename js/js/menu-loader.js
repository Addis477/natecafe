async function loadMenuItems(limit = 6, featured = false) {
    try {
        const response = await fetch('/content/menu/index.json');
        if (!response.ok) return [];
        let items = await response.json();
        if (featured) items = items.filter(item => item.featured === true);
        if (limit && items.length > limit) items = items.slice(0, limit);
        return items;
    } catch (error) {
        return [];
    }
}

async function displayFeaturedMenu() {
    const container = document.getElementById('featured-menu');
    if (!container) return;
    const items = await loadMenuItems(6, true);
    if (items.length === 0) {
        container.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 40px;"><p>🌟 Menu items coming soon! Add your first item in the admin panel. 🌟</p><p><a href="/admin/">Go to Admin Dashboard →</a></p></div>';
        return;
    }
    container.innerHTML = items.map(item => `
        <div class="menu-card">
            ${item.image ? `<div class="menu-image"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>` : ''}
            <div class="menu-content">
                <div class="menu-header"><h3>${escapeHtml(item.title)}</h3><span class="price">${item.price} ETB</span></div>
                <p class="description">${escapeHtml(item.body || '')}</p>
                <span class="category">${escapeHtml(item.category)}</span>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }

if (document.getElementById('featured-menu')) { displayFeaturedMenu(); }
