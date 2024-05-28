onload = () => {
    cards();
    plataformas();
  
    document.querySelector("#btn-0").onclick = () => cards();
    document.querySelector("#btn-1").onclick = () => plataformas();
  };
  
  
  // Localize o elemento de entrada de pesquisa
  const searchInput = document.querySelector('input[type="text"]');
  
  // Adicione um ouvinte de evento para o evento 'input' em vez de 'change'
  searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.trim();
  
      // Verifique se o termo de pesquisa não está vazio
      if (searchTerm !== '') {
          // Limpe os resultados anteriores
          clearResults();
  
          // Faça a chamada para a API Rawg para obter os resultados da busca
          searchGames(searchTerm);
      } else {
          // Termo de pesquisa vazio, limpe os resultados
          clearResults();
      }
  });
  
  // Função para limpar os resultados anteriores
  function clearResults() {
      const cardsContainer = document.getElementById('cards');
      cardsContainer.innerHTML = '';
  }
  
  // Função para fazer a chamada à API Rawg e exibir os resultados
  function searchGames(searchTerm) {
      // Configure a URL da API com o termo de pesquisa
      const apiKey = '74d4099ec691418982c8ecb5c9049899';
      const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(searchTerm)}`;
      console.log(searchTerm);
      // Faça a chamada à API usando Fetch
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              // Verifique se há resultados
              console.log(data.results);
              if (data.results.length > 0) {
                  // Itere sobre os resultados e crie os elementos de exibição
                  data.results.forEach(game => {
                      const card = createGameCard(game);
                      const cardsContainer = document.getElementById('cards');
                      cardsContainer.appendChild(card);
                  });
              } else {
                  // Nenhum resultado encontrado
                  const cardsContainer = document.getElementById('cards');
                  const noResultsMessage = document.createElement('p');
                  noResultsMessage.textContent = 'Nenhum resultado encontrado.';
                  cardsContainer.appendChild(noResultsMessage);
              }
          })
          .catch(error => {
              console.log('Ocorreu um erro na busca:', error);
          });
  }
  
  // Função para criar o elemento de card do jogo
  function createGameCard(game) {
      const card = document.createElement('div');
      card.classList.add('card');
      // Crie os elementos de exibição para o card do jogo (título, imagem, descrição, etc.)
      // Você pode personalizar isso de acordo com a estrutura do seu HTML
      return card;
  }
  
  
  // Função para criar o elemento de card do jogo
  function createGameCard(game) {
      const card = document.createElement('div');
      card.classList.add('card');
      // Crie os elementos de exibição para o card do jogo (título, imagem, descrição, etc.)
      // Você pode personalizar isso de acordo com a estrutura do seu HTML
      return card;
  }
  
  // ---------------------------------------------------------------------------------------------------------------------
  async function searchId(id) {
  
    const url = `https://api.rawg.io/api/games/${id}?key=d1ee93d1345647bda344638c5e8fdd2c`;
    let data = await fetch(url).then((res) => res.json());
    let container = document.getElementById("details");
  
    let title = data.name;
  
    let str = "";
    str += `<div class="x"
        <div class="card" style="width: 18rem;">
        <img src="${data.background_image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${data.description}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Genero: ${data.genres[0].name}</li>
        <li class="list-group-item">Genero: ${data.genres[1].name}</li>
        <li class="list-group-item">Avaliação: ${data.rating}</li>
        </ul>
        </div>
      </div>
    </div>`
    console.log(data);
    container.innerHTML = str;
  }
  
  var url0 =
    "https://api.rawg.io/api/games?page=2&page_size=8&key=d1ee93d1345647bda344638c5e8fdd2c";
  async function cards() {
    let str = "";
    let data = await fetch(url0).then((res) => res.json());
    let result = data.results;
    for (let index = 0; index < result.length; index++) {
      const card = result[index];
      str += `<div class="col-12 col-sm-3 col-md-4 col-lg-3">
      <div class="card border border-0">
          <h5 class="card-title fw-bold text-truncate">${card.name}</h5>
          <div class="ratio" style="--bs-aspect-ratio: 50%;">
          <img src="${card.background_image}" class="img-fluid" alt="imagem card">
          </div>
          <h5 class="fs-6">Classificação: <span class="float-end">${card.rating}</span></h5>
          <h5 class="fs-6">Data de lançamento: <span class="float-end">${card.released}</span></h5>
          <div class="card-body">
          <a href="detalhes.html?id=${card.id}"><button type="button" class="btn btn-secondary">Mais detalhes ...</button></a>
          </div>
      </div>
      </div>`;
    }
    url0 = data.next;
    document.getElementById("cards").insertAdjacentHTML("beforeend", str);
  }
  
  var url1 = `https://api.rawg.io/api/platforms?page=1&page_size=3&key=d1ee93d1345647bda344638c5e8fdd2c`;
  async function plataformas() {
    let data = await fetch(url1).then((res) => res.json());
    let str = "";
    for (let index = 0; index < data.results.length; index++) {
      const plataforma = data.results[index];
      str += ` <div class="col-12 col-sm-4 col-md-4">
      <div class="card border border-0">
          <h5 class="card-title fw-bold">${plataforma.name}</h5>
          <div class="formimg" style="background-image: url('${plataforma.image_background}')">
              
          </div>
          <div class="card-body">
              <p class="card-text">
                  <b>Principais jogos</b>
              <ul class="lista">`;
      for (let i = 0; i < 3; i++) {
        str += `<li>${plataforma.games[i].name}</li>`;
      }
      str += `</ul>
              </p>
              <p class="card-text text-end">Mais detalhes ...</p>
          </div>
      </div>
     </div>`;
    }
    url1 = data.next;
    document.getElementById("plata").insertAdjacentHTML("beforeend", str);
  }
  
  