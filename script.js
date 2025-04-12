let offset;
const limit = 20;
let nextUrl = "";

const app = document.getElementById('app');
const styleLink = document.getElementById('page-style');

const modalOverlay = document.getElementById("modalOverlay");
const modalCard = document.getElementById("pokemonModal");
const modalImage = modalCard.querySelector(".modal-circle img");
let modalViewBtn = modalCard.querySelector(".view-btn");
let modalCatchBtn = modalCard.querySelector(".catch-btn");

const views = {
  main: `
    <div class="content">
      <div class="main">
        <h1 class="title">POKEDEX</h1>
        <div class="load-more"><div class="arrow">⬇️</div></div>
      </div>
      <div class="section"><h2 class="h2">Pokedex</h2></div>
      <div class="gallery">
        <div class="row" id="pokemon-row"></div>
        <div class="load-more"><div class="arrow2">⬇️</div></div>
      </div>
    </div>
  `,
  collection: `
    <a class="home-link" style="cursor:pointer;"><h1>POKEDEX</h1></a>
    <div class="bowl" id="collection-bowl"></div>
  `,
  detail: (name, img, types, abilities, isCaught) => `
    <div class="detail-wrapper">
      <div class="circle"><img src="${img}" alt="${name}"></div>
      <div class="info-section">
        <h1 class="pokedex-title"><a href="#" class="home-link">Pokedex</a></h1>
        <div class="details-container">
          <div class="pokemon-name">${name}</div>
          <div class="description">
            <strong>Types:</strong> ${types.join(', ')}<br>
            <strong>Abilities:</strong> ${abilities.join(', ')}
          </div>
          <div class="button-container">
            <a href="#" class="button collection">My Collection</a>
            <button class="button catch-release">${isCaught ? "Release" : "Catch"}</button>
          </div>
        </div>
      </div>
    </div>
  `
};

function parseUrl(url) {
  return url.split('/').slice(-2, -1)[0];
}

function getCaughtList() {
  return JSON.parse(localStorage.getItem('caught') || '[]');
}

function saveCaughtList(list) {
  localStorage.setItem('caught', JSON.stringify(list));
}

function isCaught(id) {
  return getCaughtList().includes(id);
}

function toggleCaught(id) {
  let list = getCaughtList();
  if (list.includes(id)) list = list.filter(x => x !== id);
  else list.push(id);
  saveCaughtList(list);
}

function updatePokemonCard(id) {
  document.querySelectorAll(`.pokemon-container [data-id="${id}"]`).forEach(btn => {
    if (btn.classList.contains("catch-btn")) {
      btn.textContent = isCaught(id) ? "Release" : "Catch";
      const container = btn.closest(".pokemon-container");
      container.style.border = isCaught(id) ? "5px solid red" : "none";
    }
  });
}

function loadView(view) {
  if (view === "main") {
    app.innerHTML = views.main;
    styleLink.href = "style.css";

    // randomize offset at start
    offset = Math.floor(Math.random() * (1154 - limit));
    nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    loadPokemons();

    setTimeout(() => {
      document.querySelectorAll(".arrow, .arrow2").forEach(arrow => {
        arrow.addEventListener("click", e => {
          e.preventDefault();
          loadPokemons();
        });
      });
    }, 0);
  }

  if (view === "collection") {
    app.innerHTML = views.collection;
    styleLink.href = "style3.css";

    const bowl = document.getElementById("collection-bowl");
    bowl.innerHTML = "";
    getCaughtList().forEach(id => {
      const div = document.createElement("div");
      div.className = "pokemon-circle";
      div.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="Pokemon">
        <div class="collection-buttons">
          <button class="view-btn" data-id="${id}">View</button>
          <button class="release-btn" data-id="${id}">Release</button>
        </div>
      `;
      bowl.appendChild(div);

      div.addEventListener("click", e => {
        e.stopPropagation();
        document.querySelectorAll(".pokemon-circle").forEach(c => c.classList.remove("active"));
        div.classList.add("active");
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".pokemon-circle").forEach(c => c.classList.remove("active"));
    });

    setTimeout(() => {
      document.querySelectorAll(".collection-buttons .view-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
          loadDetailView(btn.dataset.id);
        });
      });
      document.querySelectorAll(".collection-buttons .release-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
          toggleCaught(btn.dataset.id);
          btn.closest(".pokemon-circle").remove();
        });
      });
      document.querySelector(".home-link")?.addEventListener("click", () => loadView("main"));
    }, 0);
  }
}

async function loadPokemons() {
  const row = document.getElementById("pokemon-row");

  const res = await fetch(nextUrl);
  const data = await res.json();
  nextUrl = data.next;
  offset += limit;

  data.results.forEach(p => {
    const id = parseUrl(p.url);
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const card = document.createElement("div");
    card.className = "pokemon-container";
    if (isCaught(id)) card.style.border = "5px solid red";
    card.innerHTML = `
      <img src="${sprite}" alt="${p.name}">
      <div class="pokemon-name">${p.name}</div>
      <div class="pokemon-buttons">
        <button class="view-btn" data-id="${id}">View</button>
        <button class="catch-btn" data-id="${id}">${isCaught(id) ? "Release" : "Catch"}</button>
      </div>
    `;
    row.appendChild(card);

    card.addEventListener("click", e => {
      if (window.innerWidth <= 768) return;
      e.stopPropagation();
      document.querySelectorAll(".pokemon-container").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });

    const imgEl = card.querySelector("img");
    imgEl.addEventListener("click", async e => {
      if (window.innerWidth > 768) return;
      e.stopPropagation();

      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json());
      modalImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      modalCatchBtn.textContent = isCaught(id) ? "Release" : "Catch";
      modalCatchBtn.replaceWith(modalCatchBtn.cloneNode(true));
      modalCatchBtn = modalCard.querySelector(".catch-btn");

      modalCatchBtn.addEventListener("click", () => {
        toggleCaught(id);
        modalOverlay.style.display = "none";
        updatePokemonCard(id);
      });

      modalViewBtn.replaceWith(modalViewBtn.cloneNode(true));
      modalViewBtn = modalCard.querySelector(".view-btn");

      modalViewBtn.addEventListener("click", () => {
        modalOverlay.style.display = "none";
        loadDetailView(id);
      });

      modalOverlay.style.display = "flex";

      modalOverlay.addEventListener("click", function close(e) {
        if (e.target === modalOverlay) {
          modalOverlay.style.display = "none";
          modalOverlay.removeEventListener("click", close);
        }
      });
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".pokemon-container").forEach(c => c.classList.remove("active"));
  });

  row.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      loadDetailView(btn.dataset.id);
    });
  });

  row.querySelectorAll(".catch-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleCaught(btn.dataset.id);
      updatePokemonCard(btn.dataset.id);
    });
  });
}

async function loadDetailView(id) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json());
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const types = data.types.map(t => t.type.name);
  const abilities = data.abilities.map(a => a.ability.name);
  const caught = isCaught(id);

  app.innerHTML = views.detail(data.name, img, types, abilities, caught);
  styleLink.href = "style2.css";

  setTimeout(() => {
    document.querySelector(".home-link")?.addEventListener("click", e => {
      e.preventDefault();
      loadView("main");
    });

    document.querySelector(".button.collection")?.addEventListener("click", e => {
      e.preventDefault();
      loadView("collection");
    });

    document.querySelector(".catch-release")?.addEventListener("click", () => {
      toggleCaught(id);
      loadDetailView(id);
    });
  }, 0);
}

 
loadView("main");
