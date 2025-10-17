function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card news-with-image featured" onclick="navigateToLatestNews()" style="cursor: pointer;">
            <div class="click-indicator">Нажмите для перехода</div>
            <h3>🎥 Новое видео на канале!</h3>
            <span class="news-date">17 октября 2025</span>

            <!-- Блок с изображением -->
            <div class="news-image-container">
                <img src="assets/images/SoI4part.png"
                     alt="Анонс игры Survival On Islands"
                     class="news-image">
            </div>

            <p>На YouTube канале вышла 4 часть про SoI.</p>
            <p>Скорей иди смотри, пока новое!</p>
            <p>В 15:00 по МСК - <a href="https://youtu.be/Ju5P-TI2qVA" onclick="event.stopPropagation()">смотреть видео</a></p>
            
            <!-- Кнопка для перехода -->
            <div style="margin-top: 1rem;">
                <a href="news.html#news-SoI4part" class="btn" onclick="event.stopPropagation()">Читать полностью</a>
            </div>
        </div>
    `;
}

// Функция для перехода к последней новости
function navigateToLatestNews() {
    window.location.href = 'news.html#news-SoI4part';
}

function showErrorMessage(message) {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card featured">
            <h3>Ошибка загрузки</h3>
            <p>${message}</p>
            <a href="news.html" class="btn" style="margin-top: 1rem;">Перейти к новостям</a>
        </div>
    `;
}

// Загружаем последнюю новость при загрузке страницы
document.addEventListener('DOMContentLoaded', loadLatestNews);