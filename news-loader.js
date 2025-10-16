function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card featured news-with-image" onclick="navigateToLatestNews()" style="cursor: pointer;">
            <h3>🎮 Открытие сайта</h3>
            <span class="news-date">16 октября 2025</span>

            <!-- Блок с изображением -->
            <div class="news-image-container">
                <img src="assets/images/FirstNews.png"
                     alt="Открытие сайта Club&Games"
                     class="news-image">
            </div>

            <p>Сегодня спустя несколько лет сайт преобразился.</p>
            <p>Изменен его внешний вид, содержание и другое!</p>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed #fecaca;">
                <small style="color: var(--primary-red);">🔍 Нажмите на карточку, чтобы перейти к полной новости</small>
            </div>
        </div>
    `;
}

// Функция для перехода к последней новости
function navigateToLatestNews() {
    // Переходим на страницу новостей с якорем к первой новости
    window.location.href = 'news.html#news-opening';
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