
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const fotoBox = document.getElementById('foto-box');
const btnFoto = document.getElementById('btn-foto');
const fotoTexto = document.getElementById('foto-texto');
let stream = null;
let modo = 'ligar'; 

// Alterna entre "ligar" e "capturar"

async function alternarCameraOuCaptura() {
  if (modo === 'ligar') {
    await ligarCamera();
    btnFoto.textContent = 'Capturar';
    modo = 'capturar';
  } else {
    capturarFoto();
    btnFoto.textContent = 'Fotografar';
    modo = 'ligar';
  }
}

async function ligarCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
    canvas.style.display = 'none';
    fotoTexto.style.display = 'none';
  } catch (err) {
    alert('Erro ao acessar a câmera: ' + err);
  }
}

function capturarFoto() {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL('image/png');
  fotoBox.style.background = `url(${dataURL}) center/cover no-repeat`;
  canvas.style.display = 'none';
  video.style.display = 'none';
  fotoTexto.style.display = 'none';

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

const inputGaleria = document.getElementById('input-galeria');

function abrirGaleria() {
  inputGaleria.click();
}

inputGaleria.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      fotoBox.style.background = `url(${e.target.result}) center/cover no-repeat`;
      video.style.display = 'none';
      canvas.style.display = 'none';
      fotoTexto.style.display = 'none';
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    reader.readAsDataURL(file);
  }
});

function atualizarDataHora() {
    const agora = new Date();
  
    // Data formatada para o input (yyyy-mm-dd)
    const data = agora.toISOString().slice(0, 10);
    document.getElementById('data-entrada').value = data;
  
    // Hora formatada para o input (hh:mm)
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    document.getElementById('hora-entrada').value = `${horas}:${minutos}`;
  }
  
  // Atualiza a hora a cada segundo
  setInterval(atualizarDataHora, 1000);
  atualizarDataHora(); // Chama uma vez assim que carrega
  


  const setores = [
    "APOIO AO GABINETE - APOIO GAB",
    "ARQUIVO ADMINISTRATIVO - ARQ",
    "ARQUIVO PUBLICO DO ESTADO DO AMAZONAS - APEAM",
    "ASSESSORIA DE COMUNICAÇÃO - ASSCOM",
    "ASSESSORIA TÉCNICO-ADMINISTRATIVA - ATA",
    "CHEFIA DE GABINETE - APOIO GAB.",
    "COMISSÃO DE REGIME DISCIPLINAR - CRD",
    "COMITÊ DE GOVERNANÇA E TRANSFORMAÇÃO DIGITAL - CGTD",
    "CONSIGLOG TECNOLOGIA E SOLUCOES LTDA - CONSIGLOG",
    "CONSULTORIA TÉCNICO-ADMINISTRATIVA - CTA",
    "CONTROLADORIA INTERNA - CI",
    "COORDENADORIA DE PATRIMÔNIO - CPAT",
    "DEPARTAMENTO DE ADMINISTRAÇÃO E FINANÇAS - DAFI",
    "DEPARTAMENTO DE GESTÃO DE BENS IMÓVEIS - DGBI",
    "DEPARTAMENTO DE GESTÃO DE BENS MÓVEIS - DGBM",
    "DEPARTAMENTO DE GESTÃO DE FROTAS E COMBUSTÍVEIS - DGFC",
    "DEPARTAMENTO DE TECNOLOGIA DA INFORMAÇÃO - DETI",
    "ESCRITÓRIO DE PROCESSOS E PROJETOS - EPP",
    "ESCOLA DE GESTÃO E APERFEIÇOAMENTO DO SERVIDOR PÚBLICO - ESASP",
    "GERÊNCIA DE APOIO LOGÍSTICO - GELOG",
    "GERÊNCIA DE CONTAS PÚBLICAS - GCP",
    "GERÊNCIA DE DIÁRIAS E PASSAGENS - GDP",
    "GERÊNCIA DE PESSOAL - GEPES",
    "GERÊNCIA DE PLANEJAMENTO, ORÇAMENTO E FINANÇAS - GEOF",
    "GERÊNCIA DE PROTOCOLO - PROTO",
    "GERÊNCIA DE VALORIZAÇÃO DO SERVIDOR - GVS",
    "GERÊNCIA GERAL DA SGRH - GG-SGRH",
    "GRUPO INTEGRADO DE PREVENÇÃO ÀS INVASÕES DE ÁREAS PÚBLICAS - GIPIAP",
    "JUNTA MÉDICO-PERICIAL DO ESTADO - JMPE",
    "OUVIDORIA - OUV",
    "SECRETARIA EXECUTIVA ADJUNTA DE GESTÃO PATRIMONIAL E GASTOS PUBLICOS - SEPGP",
    "SECRETARIA EXECUTIVA ADJUNTA DE RECURSOS HUMANOS - SGRH",
    "SECRETARIA EXECUTIVA DE ADMINISTRAÇÃO E GESTÃO - SEAG",
    "SECRETARIA EXECUTIVA DE GESTÃO DE PATRIMÔNIO E GASTOS PÚBLICOS - SEPAGAP",
    "SETOR DE CONTRATOS INSTITUCIONAIS - SCI"
  ];

  const input = document.getElementById("setorInput");
  const suggestionsList = document.getElementById("suggestionsList");
  let selectedIndex = -1;


  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const filtered = setores.filter(s => s.toLowerCase().includes(query));
    showSuggestions(filtered);
  });

  input.addEventListener("keydown", (e) => {
    const items = suggestionsList.querySelectorAll("li");
    if (e.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % items.length;
      highlight(items);
    } else if (e.key === "ArrowUp") {
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      highlight(items);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      input.value = items[selectedIndex].textContent;
      clearSuggestions();
    } else if (e.key === "Escape") {
      clearSuggestions();
    }
  });

  function showSuggestions(suggestions) {
    clearSuggestions();
    selectedIndex = -1;

    suggestions.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      li.addEventListener("click", () => {
        input.value = s;
        clearSuggestions();
      });
      suggestionsList.appendChild(li);
    });

    if (suggestions.length > 0) {
      suggestionsList.classList.add("visible");
    }
  }

  function highlight(items) {
    items.forEach(i => i.classList.remove("active"));
    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].classList.add("active");
    }
  }

  function clearSuggestions() {
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("visible");
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".autocomplete-container")) {
      clearSuggestions();
    }
  });

  function fadeOut(event, link) {
    event.preventDefault();
    document.body.classList.add("fade-out");
  
    setTimeout(() => {
      window.location = link.href;
    }, 500); // tempo da animação
  }
  