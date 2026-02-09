// presentacion.js

/**
 * Los contenidos de los archivos .md y Dashboard
 */

const projectContent = {
    '01_README.md': `# Trabajo Final: Gasto Militar y Calidad Democrática ante el Yihadismo

**🚀 [VER PRESENTACIÓN INTERACTIVA (LIVE)](https://garciaanyer2-ai.github.io/trabajo.final/)**

**Alumno:** Anyerlin Ravelo
**Fecha:** 08/02/2026

---

## Orden de trabajo

| Orden | Fase Operativa | Objetivo Estratégico |
|-------|---------|-----------|
| **I** | \`01_README.md\` | Definición de Inteligencia y Activos |
| **II** | \`02_INFRAESTRUCTURA.md\` | Despliegue del Entorno Contenedorizado |
| **III** | \`pipeline.py\` | ETL Distribuido y Limpieza de Señales |
| **IV** | \`03_RESULTADOS.md\` | Visualización y Explotación Táctica |
| **V** | \`04_REFLEXION_IA.md\` | Post-Mortem y Optimización de Prompting |
| **VI** | \`05_RESPUESTAS.md\` | Validación de Capacidades Técnicas |

---

## Pregunta de investigacion

¿Cómo ha evolucionado la relación entre el gasto militar y la calidad democrática en países clave afectados por el fenómeno del yihadismo en Europa y Asia Central durante el periodo 2000-2023?

---

## Paises seleccionados (5)

| # | Pais | Codigo ISO | Selección |
|---|------|------------|-----------|
| 1 | España | ESP | Referente europeo. |
| 2 | Francia | FRA | Respuesta militar activa. |
| 3 | Turquía | TUR | Puente estratégico. |
| 4 | Afganistán | AFG | Epicentro de conflicto. |
| 5 | Rusia | RUS | Tendencia autocrática marcada. |
`,

    '02_INFRAESTRUCTURA.md': `# Paso 2: Infraestructura Docker

## 2.1 Mi docker-compose.yml explicado

### Servicio: PostgreSQL
Este servicio levanta una base de datos PostgreSQL :15-alpine para almacenar los datos limpios.

### Servicio: Spark Master
Actúa como coordinador del cluster. Expone la UI en el puerto 8080.

### Servicio: Spark Worker
Ejecuta el procesamiento. Se conecta al Master y tiene límites de RAM (1GB).

---

## 2.2 Healthchecks
PostgreSQL tiene un healthcheck que asegura que Spark no intente conectarse antes de que la base de datos esté lista.

---

## 2.3 Evidencia: Captura Spark UI
![Spark UI](capturas/spark_ui.png)`,

    '03_RESULTADOS.md': `# Paso 3: Resultados y Analisis

## 3.1 Grafico 1: Evolucion del Gasto Militar (% del PIB)

![Grafico 1](capturas/grafico1.png)

### Interpretacion
Se observa un patrón divergente. España y Francia muestran estabilidad institucional, mientras Rusia mantiene un crecimiento militar agresivo. Afganistán colapsa en 2021.

---

## 3.2 Grafico 2: Evolucion del Indice de Democracia Liberal (V-Dem)

![Grafico 2](capturas/grafico2.png)

---

## 3.3 Respuesta a mi pregunta de investigacion
La relación entre gasto militar y democracia es inversamente proporcional en regímenes híbridos bajo amenaza yihadista. En democracias consolidadas, el gasto de seguridad no compromete las libertades.`,

    '04_REFLEXION_IA.md': `# Paso 4: Reflexion IA - Proceso de Aprendizaje

## Bloque A: Infraestructura
**Aprendizaje:** El uso de PowerShell para procesar archivos grandes fue clave.

## Bloque B: Pipeline ETL
**Error:** Problemas con tipos de datos. Se solucionó con \`cast("double")\` en Spark.

## Bloque C: Analisis
**Aprendizaje:** Las visualizaciones ayudaron a descubrir historias de correlación real entre seguridad y democracia.`,

    '05_RESPUESTAS.md': `# Paso 5: Preguntas de Comprension

## 1. Infraestructura
**RAM vs CSV:** Si el worker es de 2GB y el CSV de 3GB, se produciría un OOM. Se soluciona procesando por particiones.

## 2. ETL
**Lazy Evaluation:** Spark espera a tener el plan completo para optimizar la ejecución.

## 3. Analisis
**Patrón:** Correlación negativa en autocracias. El gasto militar sube mientras la democracia baja.`,

    'dashboard': `
        <div class="dashboard-title">
            <h1 style="color:var(--accent-color)">🛰️ Panel de Vigilancia Geopolítica</h1>
            <p>Monitoreo de indicadores QoG y señales de inestabilidad (2000-2023)</p>
        </div>

        <div class="kpi-row">
            <div class="kpi-card">
                <h4>Activos en Observación</h4>
                <div class="value">05</div>
                <div class="trend up">Serie Completa Sincronizada</div>
            </div>
            <div class="kpi-card">
                <h4>Esfuerzo Crítico (MIL)</h4>
                <div class="value">11.5%</div>
                <div class="trend up" style="color:var(--alert-color)">ALERTA: Afganistán (2020)</div>
            </div>
            <div class="kpi-card">
                <h4>Erosión Institucional</h4>
                <div class="value">-78%</div>
                <div class="trend down">Tendencia Autocrática: Rusia/Turquía</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="chart-card">
                <h4>Vector de Gasto Militar (% del PIB)</h4>
                <div style="height: 300px;"><canvas id="milChart"></canvas></div>
            </div>
            <div class="chart-card">
                <h4>Índice de Resiliencia Institucional (V-Dem)</h4>
                <div style="height: 300px;"><canvas id="demChart"></canvas></div>
            </div>
        </div>
    `
};

let activeCharts = [];

function switchTab(fileName, btn) {
    const area = document.getElementById('content-area');

    // Destruir gráficos anteriores
    activeCharts.forEach(c => c.destroy());
    activeCharts = [];

    area.classList.add('fade');

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    setTimeout(() => {
        const content = projectContent[fileName] || '# Error\nArchivo no encontrado';

        if (fileName === 'dashboard') {
            area.innerHTML = content;
            // Necesitamos esperar a que el DOM se actualice para inicializar Chart.js
            setTimeout(initDashboard, 50);
        } else {
            area.innerHTML = marked.parse(content);
        }

        area.classList.remove('fade');
        document.querySelector('.presentation-content').scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
}

function initDashboard() {
    const ctxMil = document.getElementById('milChart').getContext('2d');
    const ctxDem = document.getElementById('demChart').getContext('2d');

    const labels = ['2000', '2010', '2020', '2023'];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Outfit', size: 10 } } }
        },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
        }
    };

    const milChart = new Chart(ctxMil, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'España', data: [1.2, 1.1, 1.2, 1.3], borderColor: '#6366f1', tension: 0.3, pointRadius: 5 },
                { label: 'Francia', data: [2.1, 2.0, 2.1, 2.2], borderColor: '#f8fafc', tension: 0.3, pointRadius: 5 },
                { label: 'Turquía', data: [3.5, 2.1, 2.5, 2.8], borderColor: '#fbbf24', tension: 0.3, pointRadius: 5 },
                { label: 'Rusia', data: [3.5, 3.8, 4.1, 4.5], borderColor: '#f43f5e', tension: 0.3, pointRadius: 5 },
                { label: 'Afganistán', data: [1.0, 1.5, 11.5, 1.0], borderColor: '#10b981', tension: 0.3, pointRadius: 5 }
            ]
        },
        options: chartOptions
    });

    const demChart = new Chart(ctxDem, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'España', data: [0.85, 0.84, 0.81, 0.82], borderColor: '#6366f1', tension: 0.3, pointRadius: 5 },
                { label: 'Francia', data: [0.84, 0.83, 0.82, 0.81], borderColor: '#f8fafc', tension: 0.3, pointRadius: 5 },
                { label: 'Turquía', data: [0.42, 0.48, 0.15, 0.12], borderColor: '#fbbf24', tension: 0.3, pointRadius: 5 },
                { label: 'Rusia', data: [0.38, 0.25, 0.12, 0.08], borderColor: '#f43f5e', tension: 0.3, pointRadius: 5 },
                { label: 'Afganistán', data: [0.05, 0.22, 0.18, 0.01], borderColor: '#10b981', tension: 0.3, pointRadius: 5 }
            ]
        },
        options: chartOptions
    });

    activeCharts.push(milChart, demChart);
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    switchTab('01_README.md', document.querySelector('.tab-btn'));
    initParticles();
    initTilt();
});

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initTilt() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.kpi-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = x - xc;
                const dy = y - yc;
                card.style.transform = `rotateY(${dx / 10}deg) rotateX(${-dy / 10}deg) translateY(-5px)`;
            } else {
                card.style.transform = '';
            }
        });
    });
}
