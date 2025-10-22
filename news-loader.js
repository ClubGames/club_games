function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card news-with-image featured" onclick="navigateToLatestNews()" style="cursor: pointer;">
    <div class="click-indicator">Нажмите для перехода</div>
                <h3>📰 Сообщество на сайте!</h3>
                <span class="news-date">22 октября 2025</span>

                <div class="news-image-container">
                    <img src="assets/images/сообщество.png"
                         alt="Сообщество на сайте"
                         class="news-image">
                </div>

                <p>На сайте появилось сообщество!</p>
                <p>Теперь вы можете создать обсуждаемую тему и ее люди могут комментировать</p>
                <p>Если у вас есть вопросы по играм, то вам туда!</p>
                <p>---> <a href="community.html">перейти на сообщество</a></p>
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