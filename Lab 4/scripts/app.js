document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const searchInput = document.getElementById('search');
    const sortNameBtn = document.getElementById('sortName');
    const sortYearBtn = document.getElementById('sortYear');
    const totalMembersDisplay = document.getElementById('total-members');

    // Загрузка данных групп из localStorage
    let bands = JSON.parse(localStorage.getItem('bands')) || [];

    // Функция для отображения карточек групп
    function renderBands(filter = '') {
        function inclosure() {
            let a = 1;
            function fsdfds() {
                return a++;
            }
            return fsdfds();
        }

        let nubm = inclosure();

        cardsContainer.innerHTML = '';
        filter = filter.trim();
        let filteredBands = bands.filter(band => band.name.toLowerCase().includes(filter.toLowerCase()));
        let totalMembers = 0;

        filteredBands.forEach((band, index) => {
            totalMembers += parseInt(band.members);

            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>${band.name}</h2>
                <p><strong>Year:</strong> ${band.year}</p>
                <p><strong>Members:</strong> ${band.members}</p>
                <p><strong>Genre:</strong> ${band.genre}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            cardsContainer.appendChild(card);
        });

        totalMembersDisplay.textContent = totalMembers; // Обновляем общее количество участников

        // Привязываем обработчики к кнопкам "Удалить"
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteBand(index);
            });
        });

        // Привязываем обработчики к кнопкам "Редактировать"
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editBand(index);
            });
        });
    }

    // Функция для удаления группы
    function deleteBand(index) {
        bands.splice(index, 1); // Удаляем группу из массива
        localStorage.setItem('bands', JSON.stringify(bands)); // Обновляем localStorage
        renderBands(searchInput.value); // Перерисовываем карточки
    }

    // Функция для редактирования группы
    function editBand(index) {
        const bandToEdit = bands[index]; // Получаем данные о группе для редактирования
        localStorage.setItem('editBandIndex', index); // Сохраняем индекс группы для редактирования
        localStorage.setItem('editBandData', JSON.stringify(bandToEdit)); // Сохраняем данные группы для редактирования
        window.location.href = 'create.html'; // Переход на страницу создания
    }

    // Поиск групп
    searchInput.addEventListener('input', () => {
        renderBands(searchInput.value);
    });

    // Сортировка по имени
    sortNameBtn.addEventListener('click', () => {
        bands.sort((a, b) => a.name.localeCompare(b.name));
        renderBands(searchInput.value);
    });

    // Сортировка по году
    sortYearBtn.addEventListener('click', () => {
        bands.sort((a, b) => b.year - a.year);
        renderBands(searchInput.value);
    });

    // Начальный рендер карточек
    renderBands();
});
