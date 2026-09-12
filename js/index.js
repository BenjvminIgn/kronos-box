//Al refrescar la web, me lleva a la parte del inicio//

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function(){
    window.scrollTo(0, 0);
});