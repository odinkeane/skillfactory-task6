import { BackMoveObject } from "./modules/BackMoveObject.js"
import { GameWindow } from "./modules/GameWindow.js";
import { Bird } from "./modules/Bird.js"
import { Pipe } from "./modules/Pipe.js";
import { Points } from "./modules/Points.js"

// Константы для работы
// Ассеты для птички
const BIRD_SPRITES = [
    "assets/yellowbird-downflap.png",
    "assets/yellowbird-midflap.png",
    "assets/yellowbird-upflap.png"
];
// DBP (DIFFERENCE BETWEEN PIPES) - Пространство между верхней и нижней труб, равное 5 птичкам 
const DBP = 500;
// HALF PIPE - Половина высоты трубы, для генерации труб на различной высоты и первоначальной подстройки
const HALF_PIPE = -320;
// Генерация первоначальной позиции труб
const pipesFirstPos = Math.random() * Math.abs(HALF_PIPE);
// Уровни
const LEVEL = {
    EASY: 0.3,
    MEDIUM: 1,
    HARD: 2
}
// Скорость перемещения труб
const PIPE_SPEED = {
    EASY: 5,
    MEDIUM: 7,
    HARD: 9
}

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");


// Игровые объекты
// У всех почти одинаковые конструкторы:
// Положение x и y, затем ширина и высота, ассеты и скорость перемещения
// Для птицы скорости нет, она статична по оси x
// Создание игрового окна (со временем лучше убрать, должно работать и без него)
const gameWindow = new GameWindow(0, 0, canvas.width, canvas.height, null);
// Задний фон нижняя часть. В классе BackMoveObject создается два экземпляра класса Object
const background = new BackMoveObject(0, 0, canvas.width, canvas.height, "assets/background-day.png", 3);
const base = new BackMoveObject(0, canvas.height - 131, 392, 131, "assets/base.png", 10);
// Для птицы используется три спрайта
const bird = new Bird(gameWindow.getCenterX(), gameWindow.getCenterY(), 51, 36, BIRD_SPRITES);
// Решено трубы создать по отдельности, поскольку в дальнейшем есть вероятность их располагать не на одной линии
const downPipe = new Pipe(3 * canvas.width, -pipesFirstPos + DBP, 102, 640, "assets/pipe-down.png", PIPE_SPEED.EASY)
const upPipe = new Pipe(3 * canvas.width, HALF_PIPE - pipesFirstPos, 102, 640, "assets/pipe-up.png", PIPE_SPEED.EASY)
// Подсчет очков отображается в div с классом score
const points = new Points('.score');

// Движение задних объектов и труб осуществляется 
// через добавление к времени величины deltaTime, 
// изменяющейся в зависимости от уровня сложности
let time = 0;
let deltaTime = LEVEL.EASY;
let isrunning = true;
const render = () => {
    time += deltaTime;
    // Если трубы ушли за пределы экрана, 
    // то переносятся правее на величину, равную одной ширине экрана

    // РЕАЛИЗАЦИЯ МЕХАНИКИ ДОБАВЛЕНИЯ ОЧКОВ
    // В момент, когда труба по оси x находится ближе к левому краю
    // чем птица, происходит добавление очка и отключение возможности
    // добавления очков
    // Когда труба переносится вправо, снова разрешается добавление очков

    // Это явно можно как-то улучшить...  

    if (upPipe.getCoord().x < -canvas.width / 4) {
        const newCoordY = Math.random() * Math.abs(HALF_PIPE);
        upPipe.setCoord(canvas.width, HALF_PIPE - newCoordY);
        downPipe.setCoord(canvas.width, -newCoordY + DBP);
        points.canAdd();
    }
    if (upPipe.getCoord().x < bird.getCoord().x) {
        points.plus();
    }

    // Отрисовка всех компонентов
    background.draw(ctx, gameWindow, time);
    downPipe.draw(ctx);
    upPipe.draw(ctx);
    base.draw(ctx, gameWindow, time);
    bird.draw(ctx);

    // Проверка на столкновение с объектами
    if (!(upPipe.collide(bird) || downPipe.collide(bird) || base.collide(bird))) {
        window.requestAnimationFrame(render);
    } else {

        restart();
    }

    // Изменение уровня
    if (points.getScore() >= 10) {
        deltaTime = LEVEL.MEDIUM;
        upPipe.setSpeed(PIPE_SPEED.MEDIUM);
        downPipe.setSpeed(PIPE_SPEED.MEDIUM);
    }
    if (points.getScore() >= 100) {
        deltaTime = LEVEL.HARD;
        upPipe.setSpeed(PIPE_SPEED.HARD);
        downPipe.setSpeed(PIPE_SPEED.HARD);
    }


};

window.addEventListener('resize', () => {
    if (window.innerWidth < 392) {
        const canvas = document.querySelector('.canvas');
        canvas.style.transform = `scale(${window.innerWidth / 392})`
    }
    console.log(1);
})

window.addEventListener('load', () => {
    if (window.innerWidth < 392) {
        const canvas = document.querySelector('.canvas');
        canvas.style.transform = `scale(${window.innerWidth / 392})`
    }

    render();
});

window.addEventListener('mousedown', (event) => {
    if (event.buttons == 1 && isrunning) {
        bird.up();
        if (!upPipe.isMoving()) {
            upPipe.moving();
            downPipe.moving();
        }
    }
})

function restart() {
    bird.hit();
    document.querySelector('.restart').style.bottom = (window.innerHeight < 697 && window.screen.orientation.type == "landscape-primary") ? "-60%" : "0%";
    document.querySelector('.your-score').innerHTML = points.getScore();
    let bestScore = Number(localStorage.getItem("best"));
    document.querySelector('.best-score').innerHTML = bestScore;
    console.log(points.getScore());
    if (points.getScore() > bestScore) {
        document.querySelector('.now').previousElementSibling.style.display = "block";
        document.querySelector('.best-score').innerHTML = points.getScore();
        localStorage.setItem("best", points.getScore());
    }
    isrunning = false;
}

const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', () => {
    // При рестарте все элементы переходят в изначальную позицию
    // и трубы перестают двигаться
    // Так же сбрасываются очки
    const newCoordY = Math.random() * Math.abs(HALF_PIPE);
    upPipe.setCoord(3 * canvas.width, HALF_PIPE - newCoordY);
    downPipe.setCoord(3 * canvas.width, -newCoordY + DBP);
    upPipe.stop();
    downPipe.stop();
    bird.stop();
    points.toZero();
    bird.setCoord(gameWindow.getCenterX(), gameWindow.getCenterY());
    window.requestAnimationFrame(render);
    document.querySelector('.restart').style.bottom = (window.innerHeight < 697 && window.screen.orientation.type == "landscape-primary") ? "160%" : "100%";
    document.querySelector('.now').previousElementSibling.style.display = "none"
    isrunning = true;
});