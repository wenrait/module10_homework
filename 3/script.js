const chat = document.querySelector('.chatbox_chat');
const sendBtn = document.querySelector('.button_send');
const geoBtn = document.querySelector('.button_geo');
const input = document.querySelector('input');

let webSocket;

let clientGeolocation;

function writeToScreen(data, type) {
    if (data !== clientGeolocation && data) {
        const message = document.createElement("div");
        switch(type) {
            case `status`:
                message.className = `text text_connection-status`;
                break
            case `server`:
                message.className = `message message_server`;
                break
            case `client`:
                message.className = `message message_client`;
                break
        }
        message.innerHTML = data;
        chat.append(message)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    webSocket = new WebSocket("wss://echo-ws-service.herokuapp.com");
    let type = `status`;
    
    webSocket.onopen = () => {
        const status = `Соединение установлено`;
        writeToScreen(status, type);
    };
    webSocket.onclose = () => {
        const status = 'Соединение потеряно';
        writeToScreen(status, type);
    };
    webSocket.onerror = function() {
        const status = 'Ошибка';
        writeToScreen(status, type);
    };
    webSocket.onmessage = (event) => {
        type = `server`;
        writeToScreen(event.data, type)
    };
});

sendBtn.addEventListener('click', () => {
    const text = input.value;
    type = `client`;
    writeToScreen(text, type);
    webSocket.send(text);
    input.value = '';
});

const success = (position) => {
    const { coords } = position;

    const url = `<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}" target="_blank">Геолокация</a>`;

    writeToScreen(url, type);
    
    clientGeolocation = `${coords.latitude}, ${coords.longitude}`;
    webSocket.send(clientGeolocation);
}

const error = () => {
    const status = 'Невозможно получить Ваше местоположение';
    writeToScreen(status, type);
}

geoBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error)
    } else {
        const status = 'Geolocation не поддерживается вашим браузером';
        writeToScreen(status, type);
    }
})