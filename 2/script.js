const button = document.querySelector('button');

button.addEventListener('click', () => {
    alert(`Размер экрана: ${window.screen.width}x${window.screen.height}px,
Размер окна браузера с учетом скролла: ${window.innerWidth}x${window.innerHeight}px,
Размер окна браузера без учета скролла: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}px,`);
});



