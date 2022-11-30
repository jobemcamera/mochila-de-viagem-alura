// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
// Verificação se há objetos no array 'itens' no localStorage; ou cria array vazia. Uso do JSON.parse para retornar a string para array
const itens = JSON.parse(localStorage.getItem("itens")) || []   

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach( (elemento) => {    
    criaElemento(elemento)
})     

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {   
    // Interrompe o enviar padrão do submit
    evento.preventDefault()            

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Busca se 'nome' digitado existe no array
    const existe = itens.find(elemento => elemento.nome === nome.value)

    // Criação do Objeto para receber os valores 'nome' e 'quantidade'
    const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
    }

    // Verifica se existe o id, se não cria o id
    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        // Atualização do localStorage (sobreescreve)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        // Verifica se existe itens no array (se sim, id=0), se não id=+1 do tamanho do array
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        // Adiciona o objeto no array
        itens.push(itemAtual)
    }

    // Transformação do Objeto 'itens' em string para jogar no localStorage utilizando JSON.stringfy
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'X'

    // Função anônima para pegar o this correto, arrow function não funcionaria
    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    // Remover o 'li' inteiro
    tag.remove()

    // Remover do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    // Reescrevendo no localStorage para atualizar
    localStorage.setItem("itens", JSON.stringify(itens))
}