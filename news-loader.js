function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card news-with-image featured" onclick="navigateToLatestNews()" style="cursor: pointer;">
            <div class="click-indicator">Нажмите для перехода</div>
            <h3>🎮 Обновление SoI 0.02.0!</h3>
            <span class="news-date">5 апреля 2026</span>

            <div class="news-image-container">
                <img src="assets/images/SoI_icon.png"
                     alt="Survival On Islands 0.02.0"
                     class="news-image">
            </div>

            <p>Глобальное обновление: процедурная генерация, фермерство и консоль (F1) уже в игре!</p>
            <p>---> <a href="news.html#news-SoI-0020">Подробнее об обновлении</a></p>
        </div>
    `;
}

function navigateToLatestNews() {
    window.location.href = 'news.html#news-SoI-0020';
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

document.addEventListener('DOMContentLoaded', loadLatestNews);