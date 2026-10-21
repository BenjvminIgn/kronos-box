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
                <a href="#inscripcion" class="btn btn-warning btn-lg px-4 py-3 fw-bold w-100 w-lg-auto">
                    UNIRME AL PLAN
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
                <a href="#inscripcion" class="btn btn-warning btn-lg px-4 py-3 fw-bold w-100">
                    UNIRME AL PLAN
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

// =============================================
// Indicador "¿Está abierto ahora?"
// =============================================

// Horario real del box: día de la semana (0=Domingo...6=Sábado)
// Cada bloque dura 1 hora salvo que se indique otra duración
const horarioSemanal = {
    1: [ // Lunes
        { inicio: '08:30', fin: '09:30', nombre: 'CF' },
        { inicio: '09:30', fin: '10:30', nombre: 'CF' },
        { inicio: '10:30', fin: '11:30', nombre: '+50' },
        { inicio: '17:00', fin: '18:00', nombre: 'CF' },
        { inicio: '18:00', fin: '19:00', nombre: 'CF' },
        { inicio: '19:00', fin: '20:00', nombre: 'CF' },
        { inicio: '20:00', fin: '21:00', nombre: 'CF' },
    ],
    2: [ // Martes
        { inicio: '08:30', fin: '09:30', nombre: 'CF' },
        { inicio: '09:30', fin: '10:30', nombre: 'CF' },
        { inicio: '17:00', fin: '18:00', nombre: 'CF' },
        { inicio: '18:00', fin: '19:00', nombre: 'CF' },
        { inicio: '19:00', fin: '20:00', nombre: 'CF' },
        { inicio: '20:00', fin: '21:00', nombre: 'CF' },
    ],
    3: [ // Miércoles
        { inicio: '08:30', fin: '09:30', nombre: 'CF' },
        { inicio: '09:30', fin: '10:30', nombre: 'CF' },
        { inicio: '10:30', fin: '11:30', nombre: 'Endurance' },
        { inicio: '17:00', fin: '18:00', nombre: 'CF' },
        { inicio: '18:00', fin: '19:00', nombre: 'CF' },
        { inicio: '19:00', fin: '20:00', nombre: 'CF' },
        { inicio: '20:00', fin: '21:00', nombre: 'GAP' },
    ],
    4: [ // Jueves
        { inicio: '08:30', fin: '09:30', nombre: 'CF' },
        { inicio: '09:30', fin: '10:30', nombre: 'CF' },
        { inicio: '17:00', fin: '18:00', nombre: 'CF' },
        { inicio: '18:00', fin: '19:00', nombre: 'CF' },
        { inicio: '19:00', fin: '20:00', nombre: 'CF' },
        { inicio: '20:00', fin: '21:00', nombre: 'CF' },
    ],
    5: [ // Viernes
        { inicio: '08:30', fin: '09:30', nombre: 'CF' },
        { inicio: '09:30', fin: '10:30', nombre: 'CF' },
        { inicio: '10:30', fin: '11:30', nombre: '+50' },
        { inicio: '17:00', fin: '18:00', nombre: 'CF' },
        { inicio: '18:00', fin: '19:00', nombre: 'Endurance' },
        { inicio: '19:00', fin: '20:00', nombre: 'CF' },
    ],
    6: [ // Sábado
        { inicio: '10:00', fin: '11:00', nombre: 'CF' },
        { inicio: '11:00', fin: '12:00', nombre: 'CF' },
    ],
    0: [] // Domingo cerrado
};

const nombresDias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function horaAMinutos(horaStr) {
    const [h, m] = horaStr.split(':').map(Number);
    return h * 60 + m;
}

function actualizarEstadoBox() {
    const ahora = new Date();
    const diaActual = ahora.getDay();
    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
    const bloquesHoy = horarioSemanal[diaActual] || [];

    // ¿Hay una clase corriendo ahora mismo?
    const claseActual = bloquesHoy.find(b =>
        minutosAhora >= horaAMinutos(b.inicio) && minutosAhora < horaAMinutos(b.fin)
    );

    const contenedor = document.getElementById('estado-box');
    if (!contenedor) return;

    if (claseActual) {
        contenedor.innerHTML = `
            <span class="badge d-inline-flex align-items-center gap-2 py-2 px-3" 
                  style="background-color: rgba(40, 199, 111, 0.12); color: #28c76f; border: 1px solid rgba(40, 199, 111, 0.3); font-size: 0.9rem; font-weight: 600;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #28c76f; display: inline-block;"></span>
                Hay clase ahora: ${claseActual.nombre} · hasta las ${claseActual.fin}
            </span>`;
        return;
    }

    // Si no hay clase ahora, buscar la próxima (hoy o en los próximos días)
    const proximaHoy = bloquesHoy.find(b => horaAMinutos(b.inicio) > minutosAhora);
    if (proximaHoy) {
        contenedor.innerHTML = `
            <span class="badge d-inline-flex align-items-center gap-2 py-2 px-3" 
                  style="background-color: rgba(255, 214, 0, 0.1); color: #FFD600; border: 1px solid rgba(255, 214, 0, 0.25); font-size: 0.9rem; font-weight: 600;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #FFD600; display: inline-block;"></span>
                Cerrado ahora · próxima clase hoy a las ${proximaHoy.inicio}: ${proximaHoy.nombre}
            </span>`;
        return;
    }

    // Buscar el próximo día con bloques disponibles
    for (let i = 1; i <= 7; i++) {
        const diaSiguiente = (diaActual + i) % 7;
        const bloques = horarioSemanal[diaSiguiente];
        if (bloques && bloques.length > 0) {
            contenedor.innerHTML = `
                <span class="badge d-inline-flex align-items-center gap-2 py-2 px-3" 
                      style="background-color: rgba(255, 255, 255, 0.05); color: #a0aab2; border: 1px solid rgba(255,255,255,0.1); font-size: 0.9rem; font-weight: 600;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #a0aab2; display: inline-block;"></span>
                    Cerrado · próxima clase el ${nombresDias[diaSiguiente]} a las ${bloques[0].inicio}
                </span>`;
            return;
        }
    }
}

actualizarEstadoBox();
setInterval(actualizarEstadoBox, 60000); // se actualiza solo cada minuto

const WSP_GYM = "56961801140"; // número del gym, sin el +

const formInscripcion = document.getElementById('form-inscripcion');

// Elementos del formulario y sus mensajes de error
const inputNombre = document.getElementById('nombre');
const errorNombre = document.getElementById('error-nombre');

const inputCorreo = document.getElementById('correo');
const errorCorreo = document.getElementById('error-correo');

const inputTelefono = document.getElementById('telefono');
const grupoTelefono = document.getElementById('grupo-telefono');
const errorTelefono = document.getElementById('error-telefono');

const selectPlan = document.getElementById('plan');
const errorPlan = document.getElementById('error-plan');

const checkConsentimiento = document.getElementById('consentimiento');
const errorConsentimiento = document.getElementById('error-consentimiento');

// Función para limpiar caracteres no válidos o prefijos redundantes (+56, 569, etc.)
function limpiarTelefono(valor) {
    let soloDigitos = valor.replace(/\D/g, '');

    // Si el usuario pegó el número con 569 al inicio
    if (soloDigitos.startsWith('569') && soloDigitos.length > 8) {
        soloDigitos = soloDigitos.slice(3);
    } 
    // Si comenzó con 56
    else if (soloDigitos.startsWith('56') && soloDigitos.length > 8) {
        soloDigitos = soloDigitos.slice(2);
    }
    // Si colocó un 9 adicional al inicio de 9 dígitos (duplicando el 9 de +56 9)
    else if (soloDigitos.length === 9 && soloDigitos.startsWith('9')) {
        soloDigitos = soloDigitos.slice(1);
    }

    return soloDigitos.slice(0, 8);
}

// Funciones para mostrar y limpiar errores
function mostrarError(input, errorEl, mensaje) {
    if (input) input.classList.add('is-invalid');
    if (errorEl) {
        errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation me-1"></i>${mensaje}`;
        errorEl.classList.remove('d-none');
    }
}

function limpiarError(input, errorEl) {
    if (input) input.classList.remove('is-invalid');
    if (errorEl) {
        errorEl.classList.add('d-none');
    }
}

// Limpiar mensaje de error en tiempo real cuando el usuario escribe o interactúa
inputNombre?.addEventListener('input', () => limpiarError(inputNombre, errorNombre));
inputCorreo?.addEventListener('input', () => limpiarError(inputCorreo, errorCorreo));

// Formateo y filtrado en tiempo real del teléfono
inputTelefono?.addEventListener('input', () => {
    limpiarError(inputTelefono, errorTelefono);
    grupoTelefono?.classList.remove('is-invalid-group');

    const digitos = limpiarTelefono(inputTelefono.value);
    if (digitos.length > 4) {
        inputTelefono.value = digitos.slice(0, 4) + ' ' + digitos.slice(4);
    } else {
        inputTelefono.value = digitos;
    }
});

selectPlan?.addEventListener('change', () => limpiarError(selectPlan, errorPlan));
checkConsentimiento?.addEventListener('change', () => limpiarError(checkConsentimiento, errorConsentimiento));

formInscripcion.addEventListener('submit', (e) => {
    e.preventDefault();

    let esValido = true;
    let primerInvalido = null;

    // 1. Validar Nombre Completo
    const valorNombre = inputNombre ? inputNombre.value.trim() : '';
    if (valorNombre === '') {
        mostrarError(inputNombre, errorNombre, 'Por favor, ingresa tu nombre completo.');
        esValido = false;
        if (!primerInvalido) primerInvalido = inputNombre;
    } else if (valorNombre.length < 3) {
        mostrarError(inputNombre, errorNombre, 'El nombre debe tener al menos 3 caracteres.');
        esValido = false;
        if (!primerInvalido) primerInvalido = inputNombre;
    } else {
        limpiarError(inputNombre, errorNombre);
    }

    // 2. Validar Correo Electrónico
    const valorCorreo = inputCorreo ? inputCorreo.value.trim() : '';
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valorCorreo === '') {
        mostrarError(inputCorreo, errorCorreo, 'Por favor, ingresa tu correo electrónico.');
        esValido = false;
        if (!primerInvalido) primerInvalido = inputCorreo;
    } else if (!regexCorreo.test(valorCorreo)) {
        mostrarError(inputCorreo, errorCorreo, 'Ingresa un correo electrónico válido (ej: nombre@correo.com).');
        esValido = false;
        if (!primerInvalido) primerInvalido = inputCorreo;
    } else {
        limpiarError(inputCorreo, errorCorreo);
    }

    // 3. Validar Teléfono / WhatsApp (8 dígitos chilenos tras el +56 9)
    const digitosTelefono = inputTelefono ? limpiarTelefono(inputTelefono.value) : '';
    if (digitosTelefono === '') {
        mostrarError(inputTelefono, errorTelefono, 'Por favor, ingresa tu teléfono o WhatsApp.');
        grupoTelefono?.classList.add('is-invalid-group');
        esValido = false;
        if (!primerInvalido) primerInvalido = inputTelefono;
    } else if (digitosTelefono.length < 8) {
        mostrarError(inputTelefono, errorTelefono, 'Ingresa los 8 dígitos restantes de tu número (ej: 1234 5678).');
        grupoTelefono?.classList.add('is-invalid-group');
        esValido = false;
        if (!primerInvalido) primerInvalido = inputTelefono;
    } else {
        limpiarError(inputTelefono, errorTelefono);
        grupoTelefono?.classList.remove('is-invalid-group');
    }

    // 4. Validar Plan de Interés
    if (!selectPlan || !selectPlan.value) {
        mostrarError(selectPlan, errorPlan, 'Por favor, selecciona un plan de interés.');
        esValido = false;
        if (!primerInvalido) primerInvalido = selectPlan;
    } else {
        limpiarError(selectPlan, errorPlan);
    }

    // 5. Validar Checkbox de Consentimiento
    if (!checkConsentimiento || !checkConsentimiento.checked) {
        mostrarError(checkConsentimiento, errorConsentimiento, 'Por favor, marca esta casilla para poder procesar tu solicitud.');
        esValido = false;
        if (!primerInvalido) primerInvalido = checkConsentimiento;
    } else {
        limpiarError(checkConsentimiento, errorConsentimiento);
    }

    // Si algún campo no es válido, detener y enfocar el primero con error
    if (!esValido) {
        primerInvalido?.focus();
        return;
    }

    // Si todo está correcto, formatear teléfono y enviar a WhatsApp
    const telFormateado = `+56 9 ${digitosTelefono.slice(0, 4)} ${digitosTelefono.slice(4)}`;
    const d = Object.fromEntries(new FormData(formInscripcion));
    const mensaje =
`Hola! Quiero inscribirme en Kronos Box.
Nombre: ${d.nombre}
Correo: ${d.correo}
Teléfono: ${telFormateado}
Plan: ${d.plan}`;

    window.open(`https://wa.me/${WSP_GYM}?text=${encodeURIComponent(mensaje)}`, '_blank');
    formInscripcion.reset();

    // Limpiar estados visuales
    [inputNombre, inputCorreo, inputTelefono, selectPlan, checkConsentimiento].forEach(el => {
        el?.classList.remove('is-invalid');
    });
    grupoTelefono?.classList.remove('is-invalid-group');
});