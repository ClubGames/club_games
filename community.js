document.addEventListener('DOMContentLoaded', function () {
    loadDiscussions();

    const discussionForm = document.getElementById('discussion-form');
    if (discussionForm) {
        discussionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            createDiscussion();
        });
    }
});

async function loadDiscussions() {
    const container = document.getElementById('discussions-container');
    container.innerHTML = '<div class="loading-message"><p>Загрузка обсуждений...</p></div>';

    try {
        const response = await fetch('https://api.github.com/repos/ClubGames/club_games/issues?labels=discussion&sort=created&direction=desc');

        if (!response.ok) {
            throw new Error('Ошибка загрузки обсуждений');
        }

        const issues = await response.json();
        displayDiscussions(issues);
    } catch (error) {
        console.error('Error loading discussions:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Не удалось загрузить обсуждения</p>
                <a href="https://github.com/ClubGames/club_games/issues?q=is:issue+label:discussion" 
                   class="btn btn-outline" target="_blank">
                    Посмотреть на GitHub
                </a>
            </div>
        `;
    }
}

function displayDiscussions(issues) {
    const container = document.getElementById('discussions-container');

    if (!issues || issues.length === 0) {
        container.innerHTML = `
            <div class="no-discussions">
                <p>Пока нет обсуждений. Будьте первым!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = issues.map(issue => `
        <div class="discussion-card" id="discussion-${issue.number}">
            <div class="discussion-header">
                <h3>${escapeHtml(issue.title)}</h3>
                <span class="discussion-date">${formatDate(issue.created_at)}</span>
            </div>
            
            <div class="discussion-author">
                <strong>👤 ${escapeHtml(issue.user.login)}</strong>
            </div>
            
            <div class="discussion-content">
                <p>${formatIssueBody(issue.body)}</p>
            </div>
            
            <div class="discussion-stats">
                <span class="comments-count">💬 ${issue.comments} комментариев</span>
                <span class="discussion-number">#${issue.number}</span>
            </div>
            
            <div class="discussion-actions">
                <a href="${issue.html_url}" class="btn btn-outline" target="_blank">
                    💬 Участвовать в обсуждении
                </a>
                <button onclick="loadComments(${issue.number}, this)" class="btn">
                    👁️ Показать комментарии
                </button>
            </div>
            
            <div class="comments-container" id="comments-${issue.number}"></div>
        </div>
    `).join('');
}

async function loadComments(issueNumber, button) {
    const container = document.getElementById(`comments-${issueNumber}`);

    // Если комментарии уже загружены, скрываем их
    if (container.innerHTML && !container.classList.contains('hidden')) {
        container.classList.add('hidden');
        button.textContent = '👁️ Показать комментарии';
        return;
    }

    button.textContent = '⏳ Загрузка...';
    button.disabled = true;

    try {
        const response = await fetch(`https://api.github.com/repos/ClubGames/club_games/issues/${issueNumber}/comments`);

        if (!response.ok) {
            throw new Error('Ошибка загрузки комментариев');
        }

        const comments = await response.json();
        displayComments(comments, container);

        button.textContent = '👁️ Скрыть комментарии';
        button.disabled = false;
        container.classList.remove('hidden');

    } catch (error) {
        console.error('Error loading comments:', error);
        container.innerHTML = '<p class="error">Не удалось загрузить комментарии</p>';
        button.textContent = '👁️ Показать комментарии';
        button.disabled = false;
    }
}

function displayComments(comments, container) {
    if (!comments || comments.length === 0) {
        container.innerHTML = '<p class="no-comments">Пока нет комментариев. Будьте первым!</p>';
        return;
    }

    container.innerHTML = comments.map(comment => `
        <div class="comment-card">
            <div class="comment-header">
                <strong class="comment-author">👤 ${escapeHtml(comment.user.login)}</strong>
                <span class="comment-date">${formatDate(comment.created_at)}</span>
            </div>
            <div class="comment-content">
                ${formatCommentBody(comment.body)}
            </div>
        </div>
    `).join('');
}

function createDiscussion() {
    const author = document.getElementById('discussion-author').value.trim();
    const title = document.getElementById('discussion-title').value.trim();
    const message = document.getElementById('discussion-message').value.trim();

    if (!author || !title || !message) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    if (author.length < 2) {
        alert('Имя должно содержать хотя бы 2 символа');
        return;
    }

    if (title.length < 5) {
        alert('Тема обсуждения должна содержать хотя бы 5 символов');
        return;
    }

    if (message.length < 10) {
        alert('Сообщение должно содержать хотя бы 10 символов');
        return;
    }

    const form = document.getElementById('discussion-form');
    form.classList.add('loading');

    const username = 'ClubGames';
    const repo = 'club_games';

    // ИСПРАВЛЕННЫЙ ФОРМАТ - БЕЗ ЭМОДЗИ
    const body = `
### Автор: ${author}
### Дата: ${new Date().toLocaleDateString('ru-RU')}

---

### Сообщение:
${message}

---

*Это обсуждение было создано через сайт [Club&Games](https://clubgames.github.io/club_games/community.html)*
    `.trim();

    const labels = 'discussion';
    const issueUrl = `https://github.com/${username}/${repo}/issues/new?labels=${encodeURIComponent(labels)}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;

    const newWindow = window.open(issueUrl, '_blank');

    if (newWindow) {
        showSuccessMessage();
        form.reset();
        form.classList.remove('loading');

        // Автоматическое обновление списка через 5 секунд
        setTimeout(() => {
            loadDiscussionsWithRetry(3);
        }, 5000);

    } else {
        alert('Пожалуйста, разрешите всплывающие окна для этого сайта');
        form.classList.remove('loading');
    }
}

// НОВАЯ ФУНКЦИЯ ДЛЯ ПОВТОРНЫХ ПОПЫТОК ЗАГРУЗКИ
async function loadDiscussionsWithRetry(maxAttempts = 3) {
    let attempts = 0;

    const tryLoad = async () => {
        attempts++;
        console.log(`Попытка загрузки обсуждений ${attempts}/${maxAttempts}`);

        try {
            await loadDiscussions();
            console.log('Обсуждения успешно загружены');
        } catch (error) {
            console.error(`Ошибка загрузки (попытка ${attempts}):`, error);

            if (attempts < maxAttempts) {
                // Ждем перед следующей попыткой (увеличиваем время ожидания)
                const delay = attempts * 2000; // 2, 4, 6 секунд
                console.log(`Следующая попытка через ${delay / 1000} секунд`);
                setTimeout(tryLoad, delay);
            } else {
                console.error('Все попытки загрузки завершились ошибкой');
                // Показываем кнопку для ручного обновления
                showManualRefreshButton();
            }
        }
    };

    await tryLoad();
}

function showManualRefreshButton() {
    const container = document.getElementById('discussions-container');
    if (container) {
        container.innerHTML += `
            <div style="text-align: center; margin-top: 1rem;">
                <p style="color: var(--text-light); margin-bottom: 1rem;">
                    Если ваше обсуждение не появилось, нажмите кнопку ниже
                </p>
                <button onclick="loadDiscussions()" class="btn">
                    🔄 Обновить список обсуждений
                </button>
            </div>
        `;
    }
}

// ОБНОВЛЯЕМ ФУНКЦИЮ loadDiscussions ДЛЯ ЛУЧШЕЙ ОБРАБОТКИ ОШИБОК
async function loadDiscussions() {
    const container = document.getElementById('discussions-container');
    if (!container) return;

    container.innerHTML = '<div class="loading-message"><p>Загрузка обсуждений...</p></div>';

    try {
        const response = await fetch('https://api.github.com/repos/ClubGames/club_games/issues?labels=discussion&sort=created&direction=desc');

        if (!response.ok) {
            throw new Error(`Ошибка GitHub API: ${response.status}`);
        }

        const issues = await response.json();
        displayDiscussions(issues);

    } catch (error) {
        console.error('Error loading discussions:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Не удалось загрузить обсуждения</p>
                <p><small>${error.message}</small></p>
                <div style="margin-top: 1rem;">
                    <button onclick="loadDiscussions()" class="btn" style="margin: 0.5rem;">
                        🔄 Попробовать снова
                    </button>
                    <a href="https://github.com/ClubGames/club_games/issues?q=is:issue+label:discussion" 
                       class="btn btn-outline" target="_blank" style="margin: 0.5rem;">
                        📋 Посмотреть на GitHub
                    </a>
                </div>
            </div>
        `;

        // Пробрасываем ошибку для функции повторных попыток
        throw error;
    }
}

// ОБНОВЛЯЕМ ФУНКЦИЮ УВЕДОМЛЕНИЯ
function showSuccessMessage() {
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
        max-width: 350px;
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">✅</span>
            <div>
                <strong>Обсуждение создано!</strong><br>
                <small style="font-size: 0.8rem; opacity: 0.9;">
                    Список обсуждений обновится автоматически через несколько секунд
                </small>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 8000); // Увеличиваем время показа уведомления
}

setInterval(loadDiscussions, 30000)
function formatIssueBody(body) {
    if (!body) return '';

    // Убираем служебную информацию из тела issue (БЕЗ ЭМОДЗИ)
    let formattedBody = body
        .replace(/### Автор:.*?\n/g, '')
        .replace(/### Дата:.*?\n/g, '')
        .replace(/---/g, '')
        .replace(/\*Это обсуждение было создано через сайт.*?\*/g, '')
        .trim();

    return escapeHtml(formattedBody);
}

function formatCommentBody(body) {
    if (!body) return '';

    // Простая обработка переносов строк
    return escapeHtml(body).replace(/\n/g, '<br>');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showSuccessMessage() {
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
                <strong>Обсуждение создано!</strong><br>
                <small style="font-size: 0.8rem; opacity: 0.9;">
                    Открывается GitHub для завершения
                </small>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

