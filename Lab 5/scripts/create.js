document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bandForm');
    const urlParams = new URLSearchParams(window.location.search);
    const bandId = urlParams.get('id'); // Получаем ID группы для редактирования

    if (bandId) {
        // Если есть ID группы, загружаем данные для редактирования
        fetch(`http://127.0.0.1:5000/bands/${bandId}`)
            .then(response => response.json())
            .then(band => {
                document.getElementById('name').value = band.name;
                document.getElementById('year').value = band.year_formed;
                document.getElementById('members').value = band.members;
                document.getElementById('genre').value = band.genre;
            })
            .catch(error => console.error('Ошибка загрузки данных для редактирования:', error));
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const year = document.getElementById('year').value;
        const members = document.getElementById('members').value;
        const genre = document.getElementById('genre').value;

        const bandData = { name, year_formed: year, members, genre };

        if (bandId) {
            // Если это редактирование, делаем PUT-запрос
            fetch(`http://127.0.0.1:5000/bands/${bandId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bandData)
            })
            .then(response => response.json())
            .then(() => {
                alert('Группа обновлена!');
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Ошибка при обновлении:', error));
        } else {
            // Если это создание новой группы, делаем POST-запрос
            fetch('http://127.0.0.1:5000/bands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bandData)
            })
            .then(response => response.json())
            .then(() => {
                alert('Группа создана!');
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Ошибка при создании:', error));
        }
    });
});
