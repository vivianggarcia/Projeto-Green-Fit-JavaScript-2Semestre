document.addEventListener('DOMContentLoaded', () => {
    const treinoList = document.getElementById('treinoList');
    const favoriteList = document.getElementById('favoriteList');
    
    let favoritos = JSON.parse(localStorage.getItem('favoritosTreino')) || [];

    // função para carregar os treinos do arquivo JSON
    async function loadTreinos() {
        try {
            // Alterar caminho para o arquivo JSON
            const response = await fetch('../dados/apiTreinos.json');
            
            if (!response.ok) {
                throw new Error('Erro ao carregar o JSON');
            }

            const treinos = await response.json();
            renderTreinos(treinos);
        } catch (error) {
            console.error('Erro ao carregar os treinos:', error);
            alert("Erro ao carregar os treinos. Verifique se o arquivo JSON está acessível.");
        }
    }

    // função para mostar os treinos
    function renderTreinos(treinos) {
        treinoList.innerHTML = '';
        treinos.forEach(treino => {
            const isFavorite = favoritos.some(fav => fav.id === treino.id);
            const treinoCard = document.createElement('div');
            treinoCard.classList.add('treino-card');

            treinoCard.innerHTML = `
                <h3>${treino.nome}</h3>
                <p>${treino.descricao}</p>
                <p class="duracao">${treino.duracao}</p>
                <button class="button-favorite ${isFavorite ? 'favorite' : ''}" data-id="${treino.id}">
                    ${isFavorite ? 'YP' : 'P'}
                </button>
            `;

            // clock para favoritar/remover favorito
            treinoCard.querySelector('.button-favorite').addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (favoritos.some(fav => fav.id === id)) {
                    favoritos = favoritos.filter(fav => fav.id !== id);
                    e.target.classList.remove('favorite');
                    e.target.textContent = 'P';
                } else {
                    const treinoFavorito = treinos.find(t => t.id === id);
                    favoritos.push(treinoFavorito);
                    e.target.classList.add('favorite');
                    e.target.textContent = 'YP';
                }
                localStorage.setItem('favoritosTreino', JSON.stringify(favoritos));
                renderFavorites();
            });

            treinoList.appendChild(treinoCard);
        });
    }

    // função para mostrar treinos favoritos
    function renderFavorites() {
        favoriteList.innerHTML = '';
        favoritos.forEach(treino => {
            const listItem = document.createElement('li');
            listItem.textContent = `${treino.nome} - ${treino.duracao}`;
            favoriteList.appendChild(listItem);
        });
    }

    //carregar treinos ao iniciar
    loadTreinos();
    renderFavorites();
});