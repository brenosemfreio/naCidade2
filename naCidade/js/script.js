// --- Controle de login fake ---
const authArea = document.getElementById("auth-area");

function renderNavbar() {
  const isLogged = localStorage.getItem("loggedIn");

  if (isLogged) {
  authArea.innerHTML = `
    <button class="btn btn-outline-light" 
            type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#userSidebar" aria-controls="userSidebar">
      <i class="bi bi-list fs-3"></i>
    </button>
  `;
  } else {
    authArea.innerHTML = `
      <button class="btn btn-outline-light me-2" id="loginBtn">Entrar</button>
      <button class="btn btn-primary" id="signupBtn">Criar conta</button>
    `;
    document.getElementById("loginBtn").addEventListener("click", fakeLogin);
    document.getElementById("signupBtn").addEventListener("click", fakeLogin);
  }
}

function fakeLogin() {
  localStorage.setItem("loggedIn", true);
  renderNavbar();
}

// Logout
function fakeLogout() {
  localStorage.removeItem("loggedIn");
  renderNavbar();
}

// Renderiza navbar
renderNavbar();



// --- Lista de eventos ---
const eventos = [
  { titulo: "Show da Banda XYZ", data: "25/10/2025", local: "Arena Central", imagem: "img/evento1.jpg" },
  { titulo: "Feira de Gastronomia", data: "27/10/2025", local: "Praça das Flores", imagem: "img/evento2.jpg" },
  { titulo: "Corrida Solidária", data: "02/11/2025", local: "Orla da Praia", imagem: "img/evento3.jpg" },
  { titulo: "Festival de Jazz", data: "10/11/2025", local: "Parque Cultural", imagem: "img/evento4.jpg" },
  { titulo: "Exposição de Arte Urbana", data: "15/11/2025", local: "Museu Central", imagem: "img/evento5.jpg" },
  { titulo: "Encontro de Games", data: "20/11/2025", local: "Centro de Convenções", imagem: "img/evento6.jpg" }
];

const lista = document.getElementById("lista-eventos");

function renderEventos(filtro = "") {
  lista.innerHTML = "";
  const filtrados = eventos.filter(e => e.titulo.toLowerCase().includes(filtro.toLowerCase()));

  if (filtrados.length === 0) {
    lista.innerHTML = `<p class="text-center text-muted">Nenhum evento encontrado.</p>`;
    return;
  }

  filtrados.forEach(evento => {
    const card = `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${evento.imagem}" class="card-img-top" alt="${evento.titulo}">
          <div class="card-body">
            <h5 class="card-title">${evento.titulo}</h5>
            <p class="card-text">${evento.local}</p>
            <p class="text-muted">${evento.data}</p>
            <a href="evento.html" class="btn btn-primary w-100">Ver detalhes</a>
          </div>
        </div>
      </div>
    `;
    lista.innerHTML += card;
  });
}

renderEventos();

// --- Filtro da pesquisa ---
document.getElementById("searchBtn").addEventListener("click", () => {
  const termo = document.getElementById("searchInput").value;
  renderEventos(termo);
});

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    renderEventos(e.target.value);
  }
});
