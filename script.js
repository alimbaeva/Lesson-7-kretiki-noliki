var board = document.getElementsByClassName('board')[0],// гдобальные переменные, елемент по имени класса "board" создаем коллекцию массива берем 1й элемент можно использовать querySelector(.boar);
    player = document.getElementsByClassName('gamer')[0],// это блок определяет кто сейчас ходит
    element, innerElement,// это переменные для каждой ячейки
    gamer = true,//определяет кто сейчас ходит, если true то ходит х, если false то ходит 0, по умолчании ходит х(true)
    gameTable = [[null, null, null], [null, null, null], [null, null, null]],// это массив массивов(матрица игры) null- это ячейки, этот массив log наших ответов
    nullCount = 9,// количество оставшихся ходов, в начале 9 ячейек пустые, но по ходу игры сдесь будеть меняться
    winner = null; //winner-это кто выиграл, победитель пока не определен

player.innerText = 'Сейчас ходит Х';// player это информация кто сейчас ходит

// Генерация игрового поля

for (var i = 0; i < 9; i++) {// строим клетки от 0 до 9
    element = document.createElement('div'); // 1-е построили div
    element.classList.add('cell'); // к div дали класс cell (это внешний блок)
    innerElement = document.createElement('div');// построили еще 1 div 
    innerElement.classList.add('inner-cell');// с классом inner-cell (это внутренний блок)
    innerElement.onclick = tableClick; //по клику на ячейку запустится функция tableClick, но перед тем как туда ходить устанавливаем на ячейках координаты
    innerElement.setAttribute('x', (i % 3).toString());// устанавливаем координаты к ячейкам с помощью атрибута setAttribute 5%3=2
    innerElement.setAttribute('y', parseInt(i / 3).toString());// 5 / 3= 1 - мы округляем с помошью parseInt
    element.appendChild(innerElement);// к внешнему блоку вставляем внутренние блоки
    board.appendChild(element);//к основному блоку вставим уже таблицу
}

document.getElementsByClassName('button')[0].onclick = reset;

// События нажатия на ячейку

function tableClick() { // это фун=я сработает по клику на ячейку
    if (this.innerText == '') { // this - это то на что нажали, смотирим на его содержимое(х или 0) если пустое то
        this.innerText = gamer ? 'x' : '0'; // смотрим на что равен gamer, если gamer == true то поставим Х, если  false тогда 0
        var y = this.getAttribute('y'), x = this.getAttribute('x'); // получаем координаты ячейки
        gameTable[y][x] = gamer;// на основе координат напишем true or false, по клику вносим значение в переменной gameTable и так заполняем на массив
        nullCount--; // если ход был уменьшаем счетчик ходов
        // провeряем выигрыш если все столбцы или все строки или диогональ одинаковы он выиграл не важно какой игрок либо все true либо все false
        if ((gameTable[y][0] === gamer && gameTable[y][1] === gamer && gameTable[y][2] === gamer) ||// каждая ячейка каждого столбца одинаково геймер т.е если все элементы true or false условия выполняется
            (gameTable[0][x] === gamer && gameTable[1][x] === gamer && gameTable[2][x] === gamer) || // проверка на столбца
            (gameTable[0][0] === gamer && gameTable[1][1] === gamer && gameTable[2][2] === gamer) ||// проверка на диогональ слева на право
            (gameTable[2][0] === gamer && gameTable[1][1] === gamer && gameTable[0][2] === gamer)) { // проверка на с право на лево
            winner = gamer; // то тогда winner определился и выходит победитель
        }
        // 1-й вариант:
        gamer = !gamer; // даем ход к следующему игроку еслы был х то даем на 0 и т.д
        player.innerText = gamer ? 'Сейчас ходит Х' : "Сейчас ходит 0"; // сообщаем кто сейчас ходит
        if (nullCount == 0 || winner !== null) { // если все ячейки полны и счетчик равен 0 
            if (winner !== null) { // если winner не равен пустату 
                if (confirm('Победили ' + (winner ? 'X' : '0') + '.\nЖЕЛАЕТЕ СЫГРАТЬ ЕЩЕ?')) {// если winner == х или 0 то сообщаем победителя и предлогаем сыграть , предлогает  confirm этот метод предлогает да или нет
                    reset();// если да игра начинается заново и запускается фу-я reset, если нет то выход
                }
            }
            else if (confirm('Игра закончилось в ничью.\nЖелаете сыграть еще раз?')) {
                reset();// если да игра начинается заново и запускается фу-я reset, если нет то выход
                // location.reload() // это фу-я перезагружает страницу как  F5 , можно использовать место фу-ю reset()
            }
        }
        // 2-й вариант
        //     gamer = !gamer; // даем ход к следующему игроку еслы был х то даем на 0 и т.д
        //     player.innerText = gamer ? 'Сейчас ходит Х' : "Сейчас ходит 0"; // сообщаем кто сейчас ходит
    }
    else {
        alert('Недопустимый ход');
    }
}

// Функция сброса параметров игры

function reset() {
    gamer = true;
    gameTable = [[null, null, null], [null, null, null], [null, null, null]];
    nullCount = 9;
    winner = null;
    var table = document.getElementsByClassName('inner-cell');
    for (var i = 0; i < table.length; i++) {
        table[i].innerText = '';
    }
    player.innerText = 'Сейчас ходит "Х"';
}