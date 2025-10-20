function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card news-with-image featured" onclick="navigateToLatestNews()" style="cursor: pointer;">
    <div class="click-indicator">Нажмите для перехода</div>
    <h3>🎥 Половина от тысячи на канале</h3>
    <span class="news-date">19 октября 2025</span>

    <div class="news-image-container">
        <img src="assets/images/500подп.png"
            alt="Половина от тысячи на канале"
            class="news-image">
    </div>

    <p>Наконец-то на канале стукнуло 500 подписчиков (уже 505)</p>
    <p>Я всем вам благодарен, спасибо</p>
    <p>Новая цель - 1000</p>
    <p><a href="https://www.youtube.com/@kokochuna">YouTube канал</a></p>

    <!-- Кнопка для перехода -->
    <div style="margin-top: 1rem;">
        <a href="news.html#news-SoI4part" class="btn" onclick="event.stopPropagation()">Читать полностью</a>
    </div>

</div>
    `;
}

function navigateToLatestNews() {
    window.location.href = 'news.html#news-500podp';
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