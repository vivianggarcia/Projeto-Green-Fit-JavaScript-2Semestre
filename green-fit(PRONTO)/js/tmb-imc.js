// Função para calcular IMC e TMB
function calcularIMC_TMB() {
    let sexo = document.getElementById('sexo').value;
    let idade = parseInt(document.getElementById('idade').value);
    let altura = parseFloat(document.getElementById('altura').value) / 100; // Convertendo de cm para metros
    let peso = parseFloat(document.getElementById('peso').value);

    // Verifica se todos os campos foram preenchidos corretamente
    if (isNaN(idade) || isNaN(altura) || isNaN(peso) || sexo == "0") {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cálculo do IMC
    let imc = peso / (altura * altura);
    document.getElementById('imcResultado').innerHTML = `<br><br><br> Seu IMC é: ${imc.toFixed(2)}`;

    // Cálculo da TMB (Taxa de Metabolismo Basal)
    let tmb;
    if (sexo === "1") { // Mulher
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade); // altura em cm
    } else if (sexo === "2") { // Homem
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade); // altura em cm
    }

    document.getElementById('tmbResultado').innerHTML = `<br> Sua TMB é: ${tmb.toFixed(2)} calorias/dia`;
}

