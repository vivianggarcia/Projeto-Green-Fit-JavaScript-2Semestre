// Carrega e exibe as receitas de acordo com a refeição
document.addEventListener("DOMContentLoaded", () => {
    let selectRefeicao = document.getElementById("refeicao_escolhida");
    let receitaContainer = document.querySelector(".refeicao-escolhida");

    // Função para carregar o arquivo JSON
    async function load_receitas() {
        try {
            let response = await fetch("dados/apiReceitas.json");
            let receitas = await response.json();
            return receitas;
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    }

    async function mostra_receita(refeicaoId) {
        let receitas = await load_receitas();

        // Filtra as receitas
        let receitas_filtradas = receitas.filter(receita => receita.refeicaoId === refeicaoId);

        // Limpa o conteúdo anterior
        receitaContainer.innerHTML = "";

        if (receitas_filtradas.length > 0) {
            receitas_filtradas.forEach(receita => {
                
                let receita_elemento = document.createElement("div");
                receita_elemento.classList.add("receita");

                receita_elemento.innerHTML = `
                    <h3>${receita.nome}</h3>
                    <p>${receita.descricao}</p>
                    <p>Calorias: ${receita.calorias}</p>
                    <br><br>
                `;

                receitaContainer.appendChild(receita_elemento);
            });
        } else {
            receitaContainer.innerHTML = "<p>Nenhuma receita encontrado para a refeição selecionada.</p>";
        }
    }

    selectRefeicao.addEventListener("change", () => {
        let receitaId = selectRefeicao.value;
        mostra_receita(receitaId);
    });
});