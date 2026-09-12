(function () {
    'use strict';

    var KEY = 'json-tool-theme';
    var btn = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');
    var label = document.getElementById('themeLabel');

    function paint(isDark) {
        icon.textContent = isDark ? '☀️' : '🌙';
        label.textContent = isDark ? 'Light' : 'Dark';
    }

    if (localStorage.getItem(KEY) === 'dark') {
        document.body.classList.add('dark');
        paint(true);
    }

    btn.addEventListener('click', function () {
        var isDark = !document.body.classList.contains('dark');
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem(KEY, isDark ? 'dark' : 'light');
        paint(isDark);
    });
})();
