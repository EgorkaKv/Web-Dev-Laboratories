document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bandForm');
    let editIndex = localStorage.getItem('editBandIndex');
    let editBandData = localStorage.getItem('editBandData');

    // Если есть данные для редактирования, заполняем поля
    if (editBandData) {
        const band = JSON.parse(editBandData);
        document.getElementById('name').value = band.name;
        document.getElementById('year').value = band.year;
        document.getElementById('members').value = band.members;
        document.getElementById('genre').value = band.genre;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const year = document.getElementById('year').value;
        const members = document.getElementById('members').value;
        const genre = document.getElementById('genre').value;

        const newBand = { name, year, members, genre };

        let bands = JSON.parse(localStorage.getItem('bands')) || [];

        if (editIndex !== null) {
            // Если редактируем, заменяем данные группы
            bands[editIndex] = newBand;
            localStorage.removeItem('editBandIndex'); // Удаляем индекс редактирования
            localStorage.removeItem('editBandData'); // Удаляем данные редактируемой группы
        } else {
            // Если это новая группа, добавляем её в массив
            bands.push(newBand);
        }

        localStorage.setItem('bands', JSON.stringify(bands));

        // Очищаем форму
        document.getElementById('name').value = '';
        document.getElementById('year').value = '';
        document.getElementById('members').value = '';
        document.getElementById('genre').value = '';

        alert('Band saved!');
        if (editIndex !== null) {
            window.location.href = 'index.html'; // Переходим на главную страницу
        }
    });
});
