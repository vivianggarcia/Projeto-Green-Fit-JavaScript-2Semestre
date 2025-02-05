// Carrega e exibe os treinos do grupo muscular selecionado
document.addEventListener("DOMContentLoaded", () => {
    let selectMuscleGroup = document.getElementById("g_muscular");
    let treinoContainer = document.querySelector(".treino-escolhido");

    // Função para carregar o arquivo JSON
    async function loadTreinos() {
        try {
            let response = await fetch("dados/apiTreinos.json");
            let treinos = await response.json();
            return treinos;
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    }

    // Função para exibir os treinos de acordo com o grupo muscular selecionado
    async function showTreinos(muscleGroupId) {
        let treinos = await loadTreinos();

        // Filtra os treinos pelo grupo muscular selecionado
        let treinosFiltrados = treinos.filter(treino => treino.muscleGroupId === muscleGroupId);

        // Limpa o conteúdo anterior
        treinoContainer.innerHTML = "";

        // Verifica se há treinos para exibir
        if (treinosFiltrados.length > 0) {
            treinosFiltrados.forEach(treino => {
                // Cria elementos para exibir os detalhes do treino
                const treinoElement = document.createElement("div");
                treinoElement.classList.add("treino");

                treinoElement.innerHTML = `
                    <h3>${treino.nome}</h3>
                    <p>${treino.descricao}</p>
                    <p>Duração: ${treino.duracao}</p>
                    <br><br>
                `;

                treinoContainer.appendChild(treinoElement);
            });
        } else {
            // Caso não tenha treinos para o grupo muscular selecionado
            treinoContainer.innerHTML = "<p>Nenhum treino encontrado para o grupo muscular selecionado.</p>";
        }
    }

    // Adiciona um evento de mudança ao select para atualizar os treinos ao selecionar um grupo muscular
    selectMuscleGroup.addEventListener("change", () => {
        let muscleGroupId = selectMuscleGroup.value;
        showTreinos(muscleGroupId);
    });
});