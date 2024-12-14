// main.js

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    localStorage.setItem('theme', newTheme);

    // Обновляем иконку на кнопке
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = newTheme === 'light' ? '☀️' : '🌙️';
        themeToggleBtn.setAttribute('data-theme', newTheme);
    }
}

// Устанавливаем тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);

    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = savedTheme === 'light' ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('data-theme', savedTheme);
    }

    const scrollToTopButton = document.querySelector('.scroll-to-top-btn');
    if (scrollToTopButton) {
        scrollToTopButton.textContent = scrollToTopText;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            toggleTheme();
        });
    }
});

// Анимация прокрутки для ссылок с href
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Добавление активного класса на текущую ссылку в навигации
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('a.nav-link[href^="#"]');
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
            currentSection = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (currentSection && link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Обработка кнопки "Наверх"
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.querySelector('.scroll-to-top-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});