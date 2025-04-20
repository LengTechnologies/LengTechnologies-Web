document.addEventListener('DOMContentLoaded', function () {
    // Collapse toggle logic
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
});
