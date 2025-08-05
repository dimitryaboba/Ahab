const arquivos = [
    { nome: "Mila castro", senha: "ganância", info: "Conteúdo do ARQUIVO 1:\nNome: Cleiton Neves\nIdade: 28\nCargo: Analista" },
    { nome: "Lurizer", senha: "Orgulho", info: "Conteúdo do ARQUIVO 2:\nDados do projeto OPED\nStatus: CONFIDENCIAL" },
    { nome: "Nemêsis", senha: "Ira", info: "Conteúdo do ARQUIVO 3:\nMensagem secreta: Você desbloqueou todos os arquivos!" },
    { nome: "Tupã", senha: "Preguiça", info: "Conteúdo do ARQUIVO 4:\nBackup realizado em 02/08/2025" },
    { nome: "andreas", senha: "Lúcifer", info: "Conteúdo do ARQUIVO 5:\nRelatório de desempenho anual" },
    { nome: "V", senha: "Belzebu", info: "Conteúdo do ARQUIVO 6:\nConfigurações do sistema OPED" },
    { nome: "adam smasher", senha: "192837", info: "Conteúdo do ARQUIVO 7 Adam Smaher:\na melhor dança de nitght City" },
    { nome: "Arasaka", senha: "192837", info: "Conteúdo do ARQUIVO 8:\nDados de usuários exportados" },
    { nome: "Ahab", senha: "pandora", info: "Conteúdo do ARQUIVO 9:\nEstrutura de permissões do sistema" },
    { nome: "O.P.E.D", senha: "pandora", info: "Conteúdo do ARQUIVO 10:\nFerramenta de diagnóstico OPED" },
    { nome: "", senha: "senha11", info: "Conteúdo do ARQUIVO 11:\nArquivo temporário de logs" },
    { nome: "ARQUIVO12.cfg", senha: "senha12", info: "Conteúdo do ARQUIVO 12:\nConfiguração avançada de segurança" }
];

let estado = "start"; // start, revelar, senha, aberto
let arquivoAtual = null;
let historico = [];
const cmdBody = document.getElementById('cmd-body');
const cmdPrompt = document.getElementById('cmd-prompt');
const cmdInput = document.getElementById('cmd-input');
const cmdOutput = document.getElementById('cmd-output');

function printLinha(texto, isPrompt = false) {
    const linha = document.createElement('div');
    linha.innerHTML = isPrompt
        ? `<span>C:\\OPED\\restrito&gt; </span><span>${texto}</span>`
        : `<span>${texto}</span>`;
    cmdPrompt.appendChild(linha);
    cmdBody.scrollTop = cmdBody.scrollHeight;
}

function limparPrompt() {
    cmdPrompt.innerHTML = "";
}

function handleCmd(e) {
    if (e.key !== "Enter") return;
    const val = cmdInput.value.trim();
    if (!val) return;
    historico.push(val);

    printLinha(val, true);

    if (estado === "start") {
        if (val.toLowerCase() === "revelar segredos") {
            estado = "revelar";
            mostrarArquivos();
        } else {
            printLinha("Comando não reconhecido. Digite <b>Revelar Segredos</b> para ver os arquivos restritos.");
        }
    } else if (estado === "revelar") {
        const idx = arquivos.findIndex(a => a.nome.toLowerCase() === val.toLowerCase());
        if (idx >= 0) {
            arquivoAtual = idx;
            estado = "senha";
            printLinha(`Acesso restrito detectado em ${arquivos[idx].nome}.`);
            printLinha("Digite a senha de acesso:");
        } else {
            printLinha("Arquivo não encontrado. Digite o nome exato do arquivo.");
        }
    } else if (estado === "senha") {
        if (val === arquivos[arquivoAtual].senha) {
            estado = "aberto";
            printLinha("Acesso autorizado.");
            printLinha(`<pre style="color:#00ff00;background:transparent;border:none;">${arquivos[arquivoAtual].info}</pre>`);
            printLinha("Digite <b>Revelar Segredos</b> para acessar outro arquivo, ou <b>cls</b> para limpar.");
        } else {
            printLinha("Senha inválida. Tente novamente ou digite <b>Revelar Segredos</b> para voltar.");
        }
    } else if (estado === "aberto") {
        if (val.toLowerCase() === "revelar segredos") {
            estado = "revelar";
            mostrarArquivos();
        } else if (val.toLowerCase() === "cls") {
            estado = "start";
            limparPrompt();
            printLinha("Digite <b>Revelar Segredos</b> para ver os arquivos restritos.");
        } else {
            printLinha("Comando não reconhecido. Digite <b>Revelar Segredos</b> ou <b>cls</b>.");
        }
    }
    cmdInput.value = "";
}

function mostrarArquivos() {
    printLinha("Arquivos restritos disponíveis:");
    arquivos.forEach(a => {
        printLinha(`<b>${a.nome}</b>`);
    });
    printLinha("Digite o nome do arquivo para tentar acessar.");
}

window.onload = () => {
    cmdInput.focus();
}
