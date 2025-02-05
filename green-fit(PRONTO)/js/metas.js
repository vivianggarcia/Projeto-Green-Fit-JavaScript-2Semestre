document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar os dados do arquivo JSON
    function carregarDadosMetas() {
        // Email do usuário obtido da sessão PHP
        const emailUsuario = document.getElementById('usuarioEmail').getAttribute('data-email');
        
        // Caminho para o arquivo JSON
        const arquivoMetas = 'dados/usuarios_metas.json';

        // Fazer a requisição para obter o conteúdo do arquivo JSON
        fetch(arquivoMetas)
            .then(response => response.json())
            .then(dadosMetas => {
                if (dadosMetas[emailUsuario]) {
                    // Pegar o último registro do usuário
                    const ultimoRegistro = dadosMetas[emailUsuario][dadosMetas[emailUsuario].length - 1];

                    // Exibir os dados do último registro nas divs w1-result
                    document.querySelector('.w1-result-peso').innerText = ultimoRegistro.peso;
                    document.querySelector('.w1-result-braco').innerText = ultimoRegistro.braco;
                    document.querySelector('.w1-result-cintura').innerText = ultimoRegistro.cintura;
                    document.querySelector('.w1-result-perna').innerText = ultimoRegistro.perna;

                    // Verificar se há um registro anterior para comparação
                    if (dadosMetas[emailUsuario].length > 1) {
                        const penultimoRegistro = dadosMetas[emailUsuario][dadosMetas[emailUsuario].length - 2];

                        // Exibir os dados do registro anterior nas divs w3-result
                        document.querySelector('.w3-result').innerText = penultimoRegistro.data;
                        document.querySelector('.w3-result-peso').innerText = penultimoRegistro.peso;
                        document.querySelector('.w3-result-braco').innerText = penultimoRegistro.braco;
                        document.querySelector('.w3-result-cintura').innerText = penultimoRegistro.cintura;
                        document.querySelector('.w3-result-perna').innerText = penultimoRegistro.perna;

                        // Comparar os dados atuais com o registro anterior
                        compararDados(ultimoRegistro, penultimoRegistro);
                    }
                } else {
                    console.log("Nenhum dado encontrado para o usuário.");
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    }

    // Função para comparar os dados
    function compararDados(ultimoRegistro, penultimoRegistro) {
        // Comparações para as divs w1-result (dados atuais)
        compararValores('peso', ultimoRegistro.peso, penultimoRegistro.peso);
        compararValores('braco', ultimoRegistro.braco, penultimoRegistro.braco);
        compararValores('cintura', ultimoRegistro.cintura, penultimoRegistro.cintura);
        compararValores('perna', ultimoRegistro.perna, penultimoRegistro.perna);
    }

    // Função para comparar um valor
    function compararValores(nome, valorAtual, valorAnterior) {
        const divResult = document.querySelector(`.w1-result-${nome}`);
        const divAnterior = document.querySelector(`.w3-result-${nome}`);
        let dataAnterior = document.querySelector(`.w3-result`);

        if (valorAtual !== valorAnterior) {
            divResult.style.color = '#000';
            divAnterior.style.color = '#000';
            dataAnterior.style.color = '#000';
        }
    }

    // Carregar os dados ao carregar a página
    carregarDadosMetas();
});







