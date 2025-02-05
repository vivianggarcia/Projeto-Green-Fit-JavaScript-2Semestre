document.addEventListener('DOMContentLoaded', () => {
    const receitas = [
        { "id": "1", "refeicaoId": "1", "refeicao": "Café da manhã", "nome": "Smoothie de Aveia e Banana", "descricao": "Uma mistura de aveia, banana e leite de amêndoas.", "calorias": 200 },
        { "id": "2", "refeicaoId": "1", "refeicao": "Café da manhã", "nome": "Panquecas de Aveia", "descricao": "Panquecas de aveia com mel e frutas vermelhas.", "calorias": 250 },
        { "id": "3", "refeicaoId": "1", "refeicao": "Café da manhã", "nome": "Omelete de Espinafre", "descricao": "Omelete feita com espinafre, cogumelos e queijo cottage.", "calorias": 220 },
        { "id": "4", "refeicaoId": "2", "refeicao": "Almoço", "nome": "Salada de Grão de Bico", "descricao": "Grão de bico, legumes frescos e temperos leves.", "calorias": 300 },
        { "id": "5", "refeicaoId": "2", "refeicao": "Almoço", "nome": "Quinoa com Legumes Assados", "descricao": "Quinoa acompanhada de legumes assados como abóbora, cenoura e abobrinha.", "calorias": 350 },
        { "id": "6", "refeicaoId": "2", "refeicao": "Almoço", "nome": "Filé de Peixe Grelhado", "descricao": "Filé de peixe grelhado com arroz integral e legumes.", "calorias": 400 },
        { "id": "7", "refeicaoId": "3", "refeicao": "Lanche", "nome": "Iogurte com Frutas e Granola", "descricao": "Iogurte natural com frutas vermelhas e granola.", "calorias": 150 },
        { "id": "8", "refeicaoId": "3", "refeicao": "Lanche", "nome": "Wrap de Frango com Abacate", "descricao": "Wrap de frango desfiado, abacate, alface e tomate.", "calorias": 250 },
        { "id": "9", "refeicaoId": "3", "refeicao": "Lanche", "nome": "Barrinhas de Cereal Caseiras", "descricao": "Barrinhas de cereal com aveia, mel e amendoim.", "calorias": 200 },
        { "id": "10", "refeicaoId": "4", "refeicao": "Jantar", "nome": "Frango Grelhado com Brócolis", "descricao": "Filé de frango grelhado com brócolis cozidos.", "calorias": 350 },
        { "id": "11", "refeicaoId": "4", "refeicao": "Jantar", "nome": "Salmão ao Forno com Aspargos", "descricao": "Salmão assado no forno com molho de limão e aspargos.", "calorias": 400 },
        { "id": "12", "refeicaoId": "4", "refeicao": "Jantar", "nome": "Sopa de Abóbora", "descricao": "Sopa cremosa de abóbora com gengibre e cebola.", "calorias": 180 },
        { "id": "13", "refeicaoId": "5", "refeicao": "Pré-treino", "nome": "Banana com Pasta de Amendoim", "descricao": "Banana com uma colher de pasta de amendoim.", "calorias": 180 },
        { "id": "14", "refeicaoId": "5", "refeicao": "Pré-treino", "nome": "Aveia com Mel e Frutas", "descricao": "Aveia cozida com mel e frutas picadas.", "calorias": 220 },
        { "id": "15", "refeicaoId": "5", "refeicao": "Pré-treino", "nome": "Sanduíche de Pão Integral com Atum", "descricao": "Pão integral com atum, alface e tomate.", "calorias": 250 }
    ];

    const recipeList = document.getElementById('recipeList');
    const favoriteList = document.getElementById('favoriteList');

    // armazena as receitas favoritas no localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    //função para renderizar"mostrar" as receitas
    function renderRecipes() {
        recipeList.innerHTML = '';
        receitas.forEach(receita => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const isFavorite = favoritos.some(fav => fav.id === receita.id);

            recipeCard.innerHTML = `
                <h3>${receita.nome}</h3>
                <p>${receita.descricao}</p>
                <p class="calorias">${receita.calorias} calorias</p>
                <button class="button-favorite ${isFavorite ? 'favorite' : ''}" data-id="${receita.id}">
                    ${isFavorite ? 'YP' : 'P'}
                </button>
            `;

            // click para favoritar/remover favorito
            recipeCard.querySelector('.button-favorite').addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (favoritos.some(fav => fav.id === id)) {
                    favoritos = favoritos.filter(fav => fav.id !== id);
                    e.target.classList.remove('favorite');
                    e.target.textContent = 'P';
                } else {
                    const receitaFavorita = receitas.find(r => r.id === id);
                    favoritos.push(receitaFavorita);
                    e.target.classList.add('favorite');
                    e.target.textContent = 'YP';
                }
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                renderFavorites();
            });

            recipeList.appendChild(recipeCard);
        });
    }

    // função para mostrar as receitas marcadas como favoritas
    function renderFavorites() {
        favoriteList.innerHTML = '';
        favoritos.forEach(receita => {
            const listItem = document.createElement('li');
            listItem.textContent = `${receita.nome} - ${receita.calorias} calorias`;
            favoriteList.appendChild(listItem);
        });
    }

    // carregar as receitas ao iniciar
    renderRecipes();
    renderFavorites();
});