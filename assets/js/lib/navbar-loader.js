(function() {
    // Load navbar from shared/navbar.html and inject with correct active states
    fetch('/shared/navbar.html')
        .then(response => response.text())
        .then(html => {
            // Determine current page from window.location.pathname
            const path = window.location.pathname;
            let activePage = ''; // no match (e.g. 404) → nothing highlighted

            // Map paths to page identifiers
            if (path === '/' || path === '/index.html') {
                activePage = 'main';
            } else if (path.startsWith('/wiki')) {
                activePage = 'wiki';
            } else if (path.startsWith('/gallery')) {
                activePage = 'gallery';
            } else if (path.startsWith('/tools')) {
                activePage = 'tools';
            } else if (path.startsWith('/contact')) {
                activePage = 'contact';
            } else if (path.startsWith('/search')) {
                activePage = 'main'; // search doesn't have its own nav item
            }

            // Replace placeholders with appropriate classes
            const pages = ['main', 'wiki', 'gallery', 'tools', 'contact'];
            pages.forEach(page => {
                const className = page === activePage ? 'active' : 'non-active';
                html = html.replace(new RegExp(`\\{ACTIVE_${page}\\}`, 'g'), className);
            });

            // Inject into navbar container
            const container = document.getElementById('navbar-container');
            if (container) {
                container.innerHTML = html;

                // Re-initialize theme functionality since theme button was just added
                if (typeof initializeTheme === 'function') {
                    initializeTheme();
                } else if (typeof applyTheme === 'function') {
                    // Fallback: just apply current theme
                    const currentTheme = localStorage.getItem('theme') ||
                        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                    applyTheme(currentTheme);
                }
            }
        })
        .catch(error => {
            console.error('Failed to load navbar:', error);
        });
})();