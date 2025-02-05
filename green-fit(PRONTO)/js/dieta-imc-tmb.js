document.addEventListener('DOMContentLoaded', () => {
    // Vamos assumir que os resultados de IMC e TMB já foram calculados e estão disponíveis
    const imcResultado = document.getElementById('imcResultado');
    const tmbResultado = document.getElementById('tmbResultado');
    const dietaCalorica = document.getElementById('dietaCalorica');

    // Função que vai calcular a dieta calórica baseada no IMC e TMB
    function calcularDieta(tmb, imc) {
        let caloriasDeManutencao = tmb; // Calorias para manutenção (TMB inicialmente)

        // A primeira coisa que vamos fazer é ajustar as calorias com base no nível de atividade física
        let nivelAtividade = prompt("Qual é o seu nível de atividade física? (Escolha 1-5)\n1. Sedentário\n2. Levemente ativo\n3. Moderadamente ativo\n4. Muito ativo\n5. Extremamente ativo");

        switch (nivelAtividade) {
            case '1':
                caloriasDeManutencao *= 1.2;
                break;
            case '2':
                caloriasDeManutencao *= 1.375;
                break;
            case '3':
                caloriasDeManutencao *= 1.55;
                break;
            case '4':
                caloriasDeManutencao *= 1.725;
                break;
            case '5':
                caloriasDeManutencao *= 1.9;
                break;
            default:
                alert("Escolha inválida. Considerando o nível sedentário.");
                caloriasDeManutencao *= 1.2;
        }

        // Agora, de acordo com o IMC, decidimos se a pessoa precisa ganhar ou perder peso
        let recomendacao = "";
        if (imc < 18.5) {
            recomendacao = "Você está abaixo do peso. Recomendamos um aumento de calorias para ganhar peso.";
            caloriasDeManutencao *= 1.2; // Ganho de peso
        } else if (imc >= 18.5 && imc <= 24.9) {
            recomendacao = "Você está com o peso ideal. Mantenha sua alimentação equilibrada.";
        } else if (imc >= 25 && imc <= 29.9) {
            recomendacao = "Você está com sobrepeso. Recomendamos reduzir a ingestão calórica.";
            caloriasDeManutencao *= 0.8; // Perda de peso
        } else {
            recomendacao = "Você está com obesidade. Recomendamos uma redução significativa das calorias.";
            caloriasDeManutencao *= 0.7; // Perda de peso
        }

        // Agora, definimos uma faixa para perda ou ganho de peso
        let caloriasParaPerdaPeso = caloriasDeManutencao - (caloriasDeManutencao * 0.15); // Redução de 15% para perda de peso
        let caloriasParaGanhoPeso = caloriasDeManutencao + (caloriasDeManutencao * 0.15); // Aumento de 15% para ganho de peso

        // Exibir os resultados na tela
        dietaCalorica.innerHTML = `
            <strong>Recomendação:</strong> ${recomendacao} <br>
            <strong>Calorias para manutenção:</strong> ${Math.round(caloriasDeManutencao)} kcal/dia <br>
            <strong>Calorias para perda de peso:</strong> ${Math.round(caloriasParaPerdaPeso)} kcal/dia <br>
            <strong>Calorias para ganho de peso:</strong> ${Math.round(caloriasParaGanhoPeso)} kcal/dia <br>
        `;
    }

    // Vamos assumir que IMC e TMB já foram calculados
    // Exemplo: IMC = 24, TMB = 1500
    let imcValor = 24;  // Exemplo de IMC
    let tmbValor = 1500;  // Exemplo de TMB

    // Exibir IMC e TMB no HTML
    imcResultado.textContent = `Seu IMC é: ${imcValor}`;
    tmbResultado.textContent = `Sua TMB é: ${tmbValor} kcal/dia`;

    // Chama a função para calcular a dieta
    calcularDieta(tmbValor, imcValor);
});