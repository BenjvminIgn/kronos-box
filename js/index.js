//Al refrescar la web, me lleva a la parte del inicio//

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function(){
    window.scrollTo(0, 0);
});

// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 700,
    easing: 'ease-out',
    once: true,
    offset: 80
});

// Botón flotante "Volver al inicio"
const btnVolver = document.getElementById('btn-volver-inicio');

window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
        btnVolver.classList.add('visible');
    } else {
        btnVolver.classList.remove('visible');
    }
});