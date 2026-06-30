function loadLatestNews() {
    const container = document.getElementById('latest-news-container');
    container.innerHTML = `
        <div class="news-card news-with-image featured" onclick="navigateToLatestNews()" style="cursor: pointer;">
            <div class="click-indicator">Нажмите для перехода</div>
            <h3>🎮 Обновление SoI 0.02.1!</h3>
            <span class="news-date">30 июня 2026</span>

                <div class="news-image-container">
                    <img src="assets/images/SoI_icon.png"
                         alt="Survival On Islands 0.02.1"
                         class="news-image">
                </div>

            <p>Исправлены баги с системой крафта, сохранения мира и процедурной генерации.</p>
            <p>---> <a href="news.html#news-SoI-0021">Подробнее об обновлении</a></p>
        </div>
    `;
}

function navigateToLatestNews() {
    window.location.href = 'news.html#news-SoI-0021';
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