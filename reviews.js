// reviews.js

document.addEventListener('DOMContentLoaded', function() {
    // Обработка всех форм отзывов
    const reviewForms = document.querySelectorAll('.review-form-element');
    
    reviewForms.forEach(form => {
        form.addEventListener('submit', function(e) {
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

    if (review.name.length < 2) {
        alert('Имя должно содержать хотя бы 2 символа');
        return;
    }

    if (review.comment.length < 10) {
        alert('Пожалуйста, напишите более подробный отзыв (минимум 10 символов)');
        return;
    }

    createGitHubIssue(review);
}

function createGitHubIssue(review) {
    const username = 'ClubGames';
    const repo = 'club_games';
    
    // Создаем заголовок issue
    const title = `Отзыв: ${review.game} - ${review.name}`;
    
    // Создаем тело issue с ВСЕМИ данными в Markdown
    const body = `
### 🎮 Информация об отзыве

| Поле | Значение |
|------|----------|
| **Игра** | ${review.game} |
| **Имя пользователя** | ${review.name} |
| **Оценка** | ${'⭐'.repeat(review.rating)} (${review.rating}/5) |
| **Дата отправки** | ${review.date} |

---

### 💬 Текст отзыва:
${review.comment}

---

### 📊 Статистика отзыва:
- **Длина отзыва:** ${review.comment.length} символов
- **Оценка:** ${review.rating} из 5
- **Игра:** ${review.game}

---

*📝 Этот отзыв был отправлен через сайт [Club&Games](https://clubgames.github.io/club_games/)*  
*🕒 Время отправки: ${new Date().toISOString()}*
    `.trim();

    // Создаем labels для игры
    let gameLabel = 'shooting-city-2'; // По умолчанию для Shooting City 2
    
    if (review.game.includes('Survival On Islands')) {
        gameLabel = 'survival-on-islands';
    }

    const labels = ['review', gameLabel].filter(Boolean);
    const labelsParam = labels.map(label => `labels=${encodeURIComponent(label)}`).join('&');
    
    // Формируем URL для создания issue
    const issueUrl = `https://github.com/${username}/${repo}/issues/new?${labelsParam}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    
    // Открываем в новом окне
    const newWindow = window.open(issueUrl, '_blank');
    
    if (newWindow) {
        showSuccessMessage();
        form.reset();
    } else {
        alert('Пожалуйста, разрешите всплывающие окна для этого сайта');
    }
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
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">✅</span>
            <div>
                <strong>Спасибо за отзыв!</strong><br>
                <small style="font-size: 0.8rem; opacity: 0.9;">
                    Открывается GitHub для завершения отправки
                </small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Убираем уведомление через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOut {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }
    
    /* Стили для уведомления о блокировке всплывающих окон */
    .popup-warning {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-red);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(style);
