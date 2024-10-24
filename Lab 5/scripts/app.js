document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const searchInput = document.getElementById('search');
    const sortNameBtn = document.getElementById('sortName');
    const sortYearBtn = document.getElementById('sortYear');
    const totalMembersDisplay = document.getElementById('total-members');

    // Загрузка данных групп с backend-а
    let bands = [];

    function fetchBands() {
        fetch('http://127.0.0.1:5000/bands')  // GET-запрос к API
            .then(response => response.json())
            .then(data => {
                bands = data.bands;
                renderBands();
            })
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }

    // Функция для отображения карточек групп
    function renderBands(filter = '') {
        cardsContainer.innerHTML = '';
        filter = filter.trim();
        let filteredBands = bands.filter(band => band.name.toLowerCase().includes(filter.toLowerCase()));
        let totalMembers = 0;

        filteredBands.forEach((band) => {
            totalMembers += parseInt(band.members);

            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>${band.name}</h2>
                <p><strong>Year:</strong> ${band.year_formed}</p>
                <p><strong>Members:</strong> ${band.members}</p>
                <p><strong>Genre:</strong> ${band.genre}</p>
                <button class="edit-btn" data-id="${band.id}">Edit</button>
                <button class="delete-btn" data-id="${band.id}">Delete</button>
            `;
            cardsContainer.appendChild(card);
        });

        totalMembersDisplay.textContent = totalMembers;

        // Привязываем обработчики к кнопкам "Удалить"
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                deleteBand(id);
            });
        });

        // Привязываем обработчики к кнопкам "Редактировать"
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                editBand(id);
            });
        });
    }

    // Функция для удаления группы
    function deleteBand(id) {
        fetch(`http://127.0.0.1:5000/bands/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            bands = bands.filter(band => band.id != id); // Удаляем группу из массива
            renderBands(searchInput.value);
        })
        .catch(error => console.error('Ошибка удаления:', error));
    }

    // Функция для редактирования группы
    function editBand(id) {
        window.location.href = `create.html?id=${id}`; // Передаем ID через URL для редактирования
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
        bands.sort((a, b) => b.year_formed - a.year_formed);
        renderBands(searchInput.value);
    });

    // Начальный рендер карточек
    fetchBands();
});
