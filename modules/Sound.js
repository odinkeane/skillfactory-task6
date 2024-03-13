export class Sound {
    constructor(src) {
        this.context = new AudioContext(); // Создание аудиоконтекста
        this.audioBuffer;
        fetch(src) // Загрузка звукового файла
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            this.audioBuffer = decodedAudio; // Сохраняем обработанное аудио
        });
    }
    play() {
        let source = this.context.createBufferSource(); // Создаём источник звука
        source.buffer = this.audioBuffer; // Устанавливаем буфер с аудиофайлом
        source.connect(this.context.destination); // Подключаем источник к аудиовыходу
        source.start(this.context.currentTime); // Запускаем воспроизведение
    }
}