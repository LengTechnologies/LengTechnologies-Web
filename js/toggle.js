document.addEventListener('DOMContentLoaded', function () {
    // Collapse toggle logic (your existing code)
    document.querySelectorAll('.toggle-icon').forEach(toggle => {
        const chevron = toggle.querySelector('.toggle-chevron');
        const text = toggle.querySelector('.toggle-text');
        const targetId = toggle.getAttribute('data-bs-target');
        const collapseEl = document.querySelector(targetId);

        if (!collapseEl) return;

        collapseEl.addEventListener('show.bs.collapse', () => {
            chevron.classList.add('rotated');
            text.textContent = 'Hide';
        });

        collapseEl.addEventListener('hide.bs.collapse', () => {
            chevron.classList.remove('rotated');
            text.textContent = 'Learn more';
        });
    });

    // Theme toggle logic
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Detect system preference on first load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    themeIcon.className = prefersDark ? 'bi bi-sun' : 'bi bi-moon';

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
    });
});
