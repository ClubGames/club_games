function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card news-with-image featured" onclick="navigateToLatestNews()" style="cursor: pointer;">
    <div class="click-indicator">Нажмите для перехода</div>
<h3>📰 Новое видео и игра!</h3>
                <span class="news-date">4 января 2026</span>

                <div class="news-image-container">
                    <img src="assets/images/factorydedmoroz.png"
                         alt="Фабрика Деда Мороза"
                         class="news-image">
                </div>

                <p>Сегодня вышло видео и игра!</p>
                <p>На канале вышло новое видео про игру "Фабрика Деда Мороза"</p>
                <p>А на сайте игра появилась в общем доступе!</p>
                <p>---> <a href="https://youtu.be/MbhazvsOVQM">Смотреть видео (12:30 по МСК)</a></p>
                <p>---> <a href="games.html#factory-ded-moroz">Скачать игру</a></p>
    </div>

</div>
    `;
}

function navigateToLatestNews() {
    window.location.href = 'news.html#news-Soobshestvo';
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