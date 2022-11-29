const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

// array para adicionar objetos do localStorage
const itens = []

form.addEventListener('submit', (evento) => {
    // bloqueando o padrao do form
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    criaElemento(nome.value, quantidade.value)

    nome.value = '';
    quantidade.value = '';
});

function criaElemento(nome, quantidade) {
    // criando li class item
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    // criando strong
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;
    
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);

    // cria o objeto itemAtual
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    // joga o objeto itemAtual no array itens
    itens.push(itemAtual)

    // adiciona itens no localStorage. Usa o metodo stringfy do JSON para transformar em string
    localStorage.setItem('item', JSON.stringify(itens));


}