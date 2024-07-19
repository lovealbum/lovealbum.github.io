document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    // Функция для показа текущей страницы
    const showPage = (index) => {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        document.getElementById('prev').disabled = index === 0;
        document.getElementById('next').disabled = index === pages.length - 1;

        // Загрузка и воспроизведение видео
        const currentPageElement = pages[index];
        const video = currentPageElement.querySelector('video');
        
        if (video) {
            // Устанавливаем правильный источник для текущего видео
            if (index === 5) { // ID страницы с первым видео
                video.src = 'img/пз.mp4';
            } else if (index === 15) { // ID страницы со вторым видео
                video.src = 'img/doc_2023-12-31_22-47-11.mp4';
            }
            
            // Запускаем воспроизведение видео
            video.load();
            video.play().then(() => {
                console.log('Video started playing: ' + video.currentSrc);
            }).catch(error => {
                console.error('Error playing video: ' + video.currentSrc, error);
            });
        }

        // Останавливаем воспроизведение всех остальных видео
        pages.forEach((page, i) => {
            if (i !== index) {
                const otherVideo = page.querySelector('video');
                if (otherVideo) {
                    otherVideo.pause();
                    otherVideo.currentTime = 0; // Сбрасываем время до начала
                }
            }
        });

        // Обновление видимости кнопок навигации
        updatePagination(index);
    };

    // Функция для обновления видимости кнопок навигации
    const updatePagination = (index) => {
        const buttons = document.querySelectorAll('.pagination button');
        buttons.forEach(button => button.style.display = 'none'); // Скрываем все кнопки

        const pagesToShow = [1, 2, 3, 10, 20, 30, 44]; // Базовые кнопки

        // Определение диапазона для отображения
        const startPage = Math.max(1, index - 2);
        const endPage = Math.min(pages.length, index + 2);

        const dynamicPages = new Set();
        pagesToShow.forEach(number => {
            if (number <= pages.length) {
                dynamicPages.add(number);
            }
        });

        for (let i = startPage; i <= endPage; i++) {
            dynamicPages.add(i);
        }

        dynamicPages.forEach(pageNumber => {
            const button = document.getElementById(`go-to-page-${pageNumber}`);
            if (button) {
                button.style.display = 'inline-block';
                button.addEventListener('click', () => {
                    currentPage = pageNumber - 1;
                    showPage(currentPage);
                });
            }
        });
    };

    // Обработчики кнопок "prev" и "next"
    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Показ первой страницы
    showPage(currentPage);
});
