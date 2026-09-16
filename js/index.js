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

// =============================================
// Datos de Planes (fuente única de verdad)
// =============================================
const INSTAGRAM_URL = 'https://www.instagram.com/boxkronos/';

const planesComunes = [
    {
        nombre: '24 Créditos',
        frecuencia: '6 CLASES / SEM',
        descripcion: 'Ideal para atletas de alto rendimiento con alta frecuencia semanal.'
    },
    {
        nombre: '20 Créditos',
        frecuencia: '5 CLASES / SEM',
        descripcion: 'De lunes a viernes. La frecuencia perfecta para una recomposición física total.'
    },
    {
        nombre: '16 Créditos',
        frecuencia: '4 CLASES / SEM',
        descripcion: 'Equilibrio óptimo entre volumen de carga muscular y recuperación.'
    },
    {
        nombre: '12 Créditos',
        frecuencia: '3 CLASES / SEM',
        descripcion: 'Recomendado para iniciación o para complementar con otras disciplinas.'
    },
    {
        nombre: '8 Créditos',
        frecuencia: '2 CLASES / SEM',
        descripcion: 'Flexibilidad para mantener tu acondicionamiento físico con menor disponibilidad.'
    },
    {
        nombre: 'Pase Diario',
        frecuencia: 'CLASE SUELTA',
        frecuenciaClass: 'text-secondary',
        descripcion: 'Si estás de visita en Penco o Concepción y quieres entrenar por el día.',
        precioLabel: 'Por sesión',
        precioClass: 'text-warning'
    }
];

const preciosGeneral = {
    destacado: '$58.000',
    planes: ['$53.000', '$49.000', '$45.000', '$40.000', '$35.000', '$5.000']
};

const preciosEstudiante = {
    destacado: '$49.000',
    planes: ['$46.000', '$43.000', '$40.000', '$35.000', '$30.000', '$5.000']
};

const preciosLargoPlazo = {
    destacado: {
        trimestral: '$156.000',
        semestral: '$295.000',
        anual: '$556.000'
    },
    planes: [
        { trimestral: '$143.000', semestral: '$270.000', anual: '$508.000' },
        { trimestral: '$132.000', semestral: '$249.000', anual: '$470.000' },
        { trimestral: '$121.000', semestral: '$229.000', anual: '$405.000' },
        { trimestral: '$108.000', semestral: '$204.000', anual: '$360.000' }
    ]
};

// =============================================
// Funciones de renderizado
// =============================================

function renderDestacadoMensual(precio) {
    return `
    <div class="card-nosotros p-4 p-lg-5 mb-5" data-aos="fade-up" style="background: linear-gradient(145deg, rgba(255, 214, 0, 0.05) 0%, #1a1c23 100%); border-color: rgba(255, 214, 0, 0.2);">
        <div class="row align-items-center">
            <div class="col-lg-7 mb-4 mb-lg-0">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="badge bg-warning text-dark px-2 py-1" style="font-size: 0.7rem;">MÁS POPULAR</span>
                    <span class="text-warning fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">FULL ACCESS</span>
                </div>
                <h2 class="text-light mb-3">Plan Ilimitado Mensual</h2>
                <p class="text-secondary mb-4">Entrena todos los días sin restricciones de horario. Asiste a clases de CrossFit WOD, +50 Senior, Endurance y GAP.</p>
                <div class="d-flex flex-wrap gap-3 text-light" style="font-size: 0.9rem;">
                    <span><i class="fa-solid fa-check text-warning me-2"></i>Clases ilimitadas</span>
                    <span><i class="fa-solid fa-check text-warning me-2"></i>Open Box incluído</span>
                </div>
            </div>
            <div class="col-lg-5 text-lg-end">
                <div class="mb-4">
                    <p class="text-secondary mb-1" style="font-size: 0.8rem; text-transform: uppercase;">Valor mensual</p>
                    <h1 class="text-warning mb-0" style="font-size: 3.5rem; font-weight: 700;">${precio}<span class="text-secondary fs-5 fw-normal"> / mes</span></h1>
                </div>
                <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-warning btn-lg px-4 py-3 fw-bold w-100 w-lg-auto">
                    <i class="fa-brands fa-instagram me-2"></i> UNIRME AL PLAN ILIMITADO
                </a>
            </div>
        </div>
    </div>`;
}

function renderTarjetaMensual(plan, precio, delay) {
    const freqClass = plan.frecuenciaClass || 'text-warning';
    const pLabel = plan.precioLabel || 'Inversión 30 días';
    const pClass = plan.precioClass || 'text-light';

    return `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="card-nosotros h-100 p-4 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-light mb-0">${plan.nombre}</h4>
                <span class="${freqClass} fw-bold" style="font-size: 0.7rem;">${plan.frecuencia}</span>
            </div>
            <p class="text-secondary mb-4" style="font-size: 0.9rem;">${plan.descripcion}</p>
            <div class="mt-auto d-flex justify-content-between align-items-end">
                <span class="text-secondary" style="font-size: 0.8rem;">${pLabel}</span>
                <h3 class="${pClass} mb-0 fw-bold">${precio}</h3>
            </div>
        </div>
    </div>`;
}

function renderDestacadoLargoPlazo(precios) {
    return `
    <div class="card-nosotros p-4 p-lg-5 mb-5" data-aos="fade-up" style="background: linear-gradient(145deg, rgba(255, 214, 0, 0.05) 0%, #1a1c23 100%); border-color: rgba(255, 214, 0, 0.2);">
        <div class="row align-items-center">
            <div class="col-lg-7 mb-4 mb-lg-0">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="badge bg-warning text-dark px-2 py-1" style="font-size: 0.7rem;">MÁS POPULAR</span>
                    <span class="text-warning fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">FULL ACCESS</span>
                </div>
                <h2 class="text-light mb-3">Plan Ilimitado</h2>
                <p class="text-secondary mb-4">Entrena todos los días sin restricciones de horario. Asiste a clases de CrossFit WOD, +50 Senior, Endurance y GAP.</p>
                <div class="d-flex flex-wrap gap-3 text-light" style="font-size: 0.9rem;">
                    <span><i class="fa-solid fa-check text-warning me-2"></i>Clases ilimitadas</span>
                    <span><i class="fa-solid fa-check text-warning me-2"></i>Open Box incluído</span>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="d-flex flex-column gap-2 mb-4">
                    <div class="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded border border-secondary border-opacity-25">
                        <span class="text-secondary text-uppercase" style="font-size: 0.8rem;">Trimestral</span>
                        <h4 class="text-light mb-0 fw-bold">${precios.trimestral}</h4>
                    </div>
                    <div class="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded border border-secondary border-opacity-25">
                        <span class="text-secondary text-uppercase" style="font-size: 0.8rem;">Semestral</span>
                        <h4 class="text-light mb-0 fw-bold">${precios.semestral}</h4>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-3 rounded" style="background-color: rgba(255,214,0,0.1); border: 1px solid rgba(255,214,0,0.3);">
                        <span class="text-warning fw-bold text-uppercase" style="font-size: 0.8rem;">Anual</span>
                        <h4 class="text-warning mb-0 fw-bold">${precios.anual}</h4>
                    </div>
                </div>
                <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-warning btn-lg px-4 py-3 fw-bold w-100">
                    <i class="fa-brands fa-instagram me-2"></i> UNIRME AL PLAN ILIMITADO
                </a>
            </div>
        </div>
    </div>`;
}

function renderTarjetaLargoPlazo(plan, precios, delay) {
    return `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="card-nosotros h-100 p-4 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-light mb-0">${plan.nombre}</h4>
                <span class="text-warning fw-bold" style="font-size: 0.7rem;">${plan.frecuencia}</span>
            </div>
            <p class="text-secondary mb-4" style="font-size: 0.9rem;">${plan.descripcion}</p>
            <div class="mt-auto">
                <div class="d-flex justify-content-between align-items-end border-bottom border-secondary border-opacity-25 pb-2 mb-2">
                    <span class="text-secondary" style="font-size: 0.8rem;">Trimestral</span>
                    <h5 class="text-light mb-0 fw-bold">${precios.trimestral}</h5>
                </div>
                <div class="d-flex justify-content-between align-items-end border-bottom border-secondary border-opacity-25 pb-2 mb-2">
                    <span class="text-secondary" style="font-size: 0.8rem;">Semestral</span>
                    <h5 class="text-light mb-0 fw-bold">${precios.semestral}</h5>
                </div>
                <div class="d-flex justify-content-between align-items-end pt-1">
                    <span class="text-secondary" style="font-size: 0.8rem;">Anual</span>
                    <h5 class="text-warning mb-0 fw-bold">${precios.anual}</h5>
                </div>
            </div>
        </div>
    </div>`;
}

// =============================================
// Renderizar tabs
// =============================================

function renderTabMensual(containerId, precios) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = renderDestacadoMensual(precios.destacado);
    html += '<div class="row g-4">';
    planesComunes.forEach((plan, i) => {
        html += renderTarjetaMensual(plan, precios.planes[i], i * 100);
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderTabLargoPlazo(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = renderDestacadoLargoPlazo(preciosLargoPlazo.destacado);
    html += '<div class="row g-4 justify-content-center">';
    // Solo los primeros 4 planes tienen precios de largo plazo (sin Pase Diario ni 8 Créditos)
    preciosLargoPlazo.planes.forEach((precios, i) => {
        html += renderTarjetaLargoPlazo(planesComunes[i], precios, i * 100);
    });
    html += '</div>';
    container.innerHTML = html;
}

// Ejecutar renderizado
renderTabMensual('general-content', preciosGeneral);
renderTabMensual('estudiante-content', preciosEstudiante);
renderTabLargoPlazo('largo-plazo-content');