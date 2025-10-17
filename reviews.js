// reviews.js

document.addEventListener('DOMContentLoaded', function () {
    // Обработка всех форм отзывов
    const reviewForms = document.querySelectorAll('.review-form-element');

    reviewForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitReview(this);
        });
    });
});

function submitReview(form) {
    const formData = new FormData(form);
    const game = form.getAttribute('data-game');

    const review = {
        game: game,
        name: formData.get('name').trim(),
        rating: parseInt(formData.get('rating')),
        comment: formData.get('comment').trim(),
        date: new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Валидация
    if (!review.name || !review.rating || !review.comment) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    createGitHubIssue(review);
}

function createGitHubIssue(review) {
    const username = 'ClubGames'; // Замените на ваш GitHub username
    const repo = 'club_games'; // Замените на название репозитория

    // Создаем заголовок issue
    const title = `🎮 Отзыв: ${review.game} - ${review.name}`;

    // Создаем тело issue с красивым форматированием
    const body = `
## 📊 Детали отзыва

**🎯 Игра:** ${review.game}  
**⭐ Оценка:** ${'⭐'.repeat(review.rating)} (${review.rating}/5)  
**👤 Имя:** ${review.name}  
**📅 Дата:** ${review.date}  

---

## 💬 Текст отзыва:
${review.comment}

---

*🤖 Этот отзыв был отправлен через сайт [Club&Games](https://kokochuna.github.io/Club-Games/)*
    `.trim();

    // Создаем labels для игры
    const gameLabel = review.game.toLowerCase()
        .replace(/\[.*?\]/g, '') // Убираем текст в скобках
        .replace(/\s+/g, '-')    // Заменяем пробелы на дефисы
        .replace(/[^a-z0-9-]/g, '') // Убираем спецсимволы
        .replace(/-+/g, '-')     // Убираем повторяющиеся дефисы
        .replace(/^-|-$/g, '');  // Убираем дефисы в начале/конце

    const labels = ['review', gameLabel].filter(Boolean);
    const labelsParam = labels.map(label => `labels=${encodeURIComponent(label)}`).join('&');

    // Формируем URL для создания issue
    const issueUrl = `https://github.com/${username}/${repo}/issues/new?${labelsParam}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;

    // Открываем в новом окне
    window.open(issueUrl, '_blank');

    // Показываем уведомление и сбрасываем форму
    showSuccessMessage();
    form.reset();
}

function showSuccessMessage() {
    // Создаем красивое уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">✅</span>
            <div>
                <strong>Спасибо за отзыв!</strong><br>
                <small>Вы будете перенаправлены на GitHub</small>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // Убираем уведомление через 4 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);