const Catalogo = {
    main_catalogo: document.getElementById("main-catalogo"),
    botao_adicionar: document.getElementById("adicionar-noticia"),
    SelectedItem: undefined,

    atualizar() {
        this.main_catalogo.innerHTML = ""
        let lista = JSON.parse(localStorage.ListaCatalogo)

        for (var i = 0; i < lista.length; i++){
            this.main_catalogo.innerHTML += `<div>${lista[i]}</div>`
        }
    },

    adicionarItem(){
        let lista_catalogo = JSON.parse(localStorage.ListaCatalogo)
        console.log(lista_catalogo)
        lista_catalogo.push(
            `<div class="noticia" value="none">
                <img src="img/placeholder.png" alt="">
                <p class="tamanho"><strong>Título</strong></p>
                <p>“Texto aqui.”</p>
                <p>Autor: Nome do autor</p>
                <div id="buttonDiv">
                    <button onclick="Catalogo.modificarItem(this)">
                        <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                    </button>
                    <button onclick="Catalogo.removerItem(this)">
                        <i class="fa-regular fa-trash-can botaoModifyExcluir"></i>
                    </button>
                </div>
            </div>`)
    
        localStorage.ListaCatalogo = JSON.stringify(lista_catalogo)

        this.atualizar()
        
        window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    },

    removerItem(item){
        lista_catalogo = JSON.parse(localStorage.ListaCatalogo)
    
        let itemParaRemover = lista_catalogo.indexOf(item.parentElement.parentElement.outerHTML)

        lista_catalogo.splice(itemParaRemover, 1)
    
        localStorage.ListaCatalogo = JSON.stringify(lista_catalogo)
        
        this.atualizar()
    },

    filtrarItens(item) {
        let divsObj = item.parentElement.parentElement.children
        for (let i = 0; i < divsObj.length; i++){
            let selectedItem = divsObj[i].children[0]
            if (selectedItem == item) {
                if (selectedItem == this.SelectedItem){
                    selectedItem.style.removeProperty("background-color")
                    selectedItem.style.color = "#f3f3f4"
                    this.SelectedItem = undefined
                    
                    this.atualizar()
                    return

                } else {
                    selectedItem.style.backgroundColor = "white"
                    selectedItem.style.color = "#5086c1"
                    this.SelectedItem = item
                }
            } else {
                selectedItem.style.removeProperty("background-color")
                selectedItem.style.color = "#f3f3f4"
            }

        }

        let lista = JSON.parse(localStorage.ListaCatalogo)
        this.main_catalogo.innerHTML = ""
        
        for (var i = 0; i < lista.length; i++){
            let selected_div = lista[i].match(/<div[^>]*\s+value=['"]([^'"]*)['"][^>]*>/i)[1]
            
            if (selected_div == item.value) {
                this.main_catalogo.innerHTML += lista[i]
            }
        }
    },

    modificarItem(item){
        let addModifierTo = item.parentElement.parentElement.parentElement
        let divParaModificar = item.parentElement.parentElement.children

        addModifierTo.innerHTML +=`<div>
            <div>
                <div>
                    <p>URL da imagem: </p>
                    <input name="url" type="text" placeholder=${divParaModificar[0].src}>
                </div>
                <div>
                    <p>ALT da imagem: </p>
                    <input name="alt" type="text" placeholder=${divParaModificar[0].alt}>
                </div>
                <div>
                    <p>Título: </p>
                    <input name="titulo" type="text" placeholder=${divParaModificar[1].innerText}>
                </div>
                <div>
                    <p>Texto: </p>
                    <input name="texto" type="text" placeholder=${divParaModificar[2].innerText}>
                </div>
                <div>
                    <p>Autor: </p>
                    <input name="autor" type="text" placeholder=${divParaModificar[3].innerText}>
                </div>
            </div>
            <div>
                <button onclick="Catalogo.confirmarModificacao(this)"><i class="fa-solid fa-check"></i></button>
                <button onclick="Catalogo.cancelarModificacao()"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>`
    },

    confirmarModificacao(item){
        let divComInputs = item.parentElement.parentElement.children[0].children
        let divComConteudo = item.parentElement.parentElement.parentElement.children[0]

        let imageURL = divComInputs[0].children[1].value
        let imageALT = divComInputs[1].children[1].value
        let tituloNoticia = divComInputs[2].children[1].value
        let textoNoticia = divComInputs[3].children[1].value
        let autorNoticia = divComInputs[4].children[1].value

        let listaCatalogo = JSON.parse(localStorage.ListaCatalogo)

        let indexDivParaModificar = listaCatalogo.indexOf(divComConteudo.outerHTML)

        let ListaDeConteudo = divComConteudo.children
        
        if (imageURL.length > 0){ListaDeConteudo[0].src = imageURL}
        if (imageALT.length > 0){ListaDeConteudo[0].alt = imageALT}
        if (tituloNoticia.length > 0){ListaDeConteudo[1].innerText = tituloNoticia}
        if (textoNoticia.length > 0){ListaDeConteudo[2].innerText = textoNoticia}
        if (autorNoticia.length > 0){ListaDeConteudo[3].innerText = autorNoticia}
        
        console.log(listaCatalogo)
        console.log(divComConteudo)
        
        let stringList = JSON.stringify(divComConteudo)
        console.log(stringList)
        
        listaCatalogo.splice(indexDivParaModificar, 1)
        listaCatalogo.splice(indexDivParaModificar, 0, divComConteudo)

        // localStorage.ListaCatalogo = JSON.stringify(listaCatalogo)

        // this.atualizar()
    },

    cancelarModificacao(){
        this.atualizar()
    }
}

// -----------------------------------------------------------------------------------
// Sidebar
const sidebar = {
    barra_pesquisa: document.getElementById("barra-pesquisa"),
    botao_sidebar: document.getElementById("mostrar-catalogo"),
    sidebar_div: document.getElementById("sidebar-esquerda"),
    close_sidebar_div: document.getElementById("close-sidebar-div"),
    add_categoria: document.getElementById("add_categoria"),
    lista_categorias: document.getElementById("lista-categorias"),

    atualizar() {
        this.lista_categorias.innerHTML = ""
        let lista = JSON.parse(localStorage.ListaCategorias)

        for (var i = 0; i < lista.length; i++){
            this.lista_categorias.innerHTML += `<div>${lista[i]}</div>`
        }
    },

    open_sidebar() {
        this.sidebar_div.style.marginLeft = "0px";
        this.close_sidebar_div.style.display = "initial";
        this.barra_pesquisa.style.marginTop = "-3000px";
    },

    close_sidebar() {
        this.sidebar_div.style.marginLeft = "-200px";
        this.close_sidebar_div.style.display = "none";
        this.barra_pesquisa.style.marginTop = "0px";
    },

    criar_categoria() {
        let lista_categorias = JSON.parse(localStorage.ListaCategorias)
        lista_categorias.push(`<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="none">Vazio</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`)

        localStorage.ListaCategorias = JSON.stringify(lista_categorias)

        this.atualizar()
    },

    removerItem(item) {
        let _lista_categorias = JSON.parse(localStorage.ListaCategorias)
    
        let itemParaRemover = _lista_categorias.indexOf(item.parentElement.outerHTML)

        _lista_categorias.splice(itemParaRemover, 1)
    
        localStorage.ListaCategorias = JSON.stringify(_lista_categorias)
        
        this.atualizar()
    },

    modificarItem(item) {
        console.log("Modificar", item)
    },

    confirmar_modificacao_item(item) {
        let divToModify = item.parentElement.parentElement.children[0]

        let nomeInput = item.parentElement
        let valueInput = item.parentElement
        
        this.atualizar()
    },

    cancelar_modificacao_item(item) {
        console.log("Cancelar modificar item:", item)
    },
}

// -----------------------------------------------------------------------------------
// Adicionar divs ao iniciar página

if (localStorage.ListaCatalogo == undefined){
    localStorage.setItem("ListaCatalogo", "[]")

    let lista_catalogo = JSON.parse(localStorage.ListaCatalogo)
    lista_catalogo.push(
        `<div class="noticia" value="esporte">
            <img src="img/esporte.webp" alt="Taça da copa do Brasil">
            <h5 class="tamanho">Vitória no futebol!</h5>
            <p>"Nessa quarta-feira dia 16, o time do São Paulo bateu o Corinthians por 2 x 0 com gols de Wellington Rato e Lucas Moura, assim se classificando para a final da Copa do Brasil, fazendo a grande final contra o Flamengo que também ganhou, uma vitória de 1 x 0 sobre o Grêmio , com um gol de Arrascaeta de pênalti."</p>
            <p>Autor: Wellington Leal</p>
            <div id="buttonDiv">
                <button onclick="Catalogo.modificarItem(this)">
                    <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                </button>
                <button onclick="Catalogo.removerItem(this)">
                    <i class="fa-regular fa-trash-can botaoModifyExcluir"></i>
                </button>
            </div>
        </div>`,

        `<div class="noticia" value="moda">
            <img src="img/moda.webp" alt="Óculos, batom e bolsa acima de um fundo colorido">
            <h5 class="tamanho">Nova Tendência!</h5>
            <p>“Cores Vibrantes Dominam as Passarelas deste Verão. O mundo da moda está se iluminando com tons ousados de laranja, amarelo e rosa, enquanto estilistas apresentam coleções vibrantes para a estação. De vestidos a acessórios, a paleta ousada promete definir o estilo da temporada.”</p>
            <p>Autor: Leticia Muniz</p>
            <div id="buttonDiv">
                <button onclick="Catalogo.modificarItem(this)">
                    <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                </button>
                <button onclick="Catalogo.removerItem(this)"><i class="fa-regular fa-trash-can botaoModifyExcluir"></i></button>
            </div>
        </div>`,

        `<div class="noticia" value="ciencia">
            <img src="img/orquidea.jpg" alt="Orquídeas rosas">
            <h5 class="tamanho">Descoberta de novas orquídeas!</h5>
            <p>“Cientistas descobrem nova espécie de orquídea na floresta amazônica. A planta, batizada de Orchidaceae amazônica, exibe cores vibrantes e um padrão único de pétalas. Sua adaptação a ambientes de sombra lança luz sobre estratégias de sobrevivência de plantas na densa selva. A descoberta amplia nosso entendimento sobre a biodiversidade amazônica e destaca a importância contínua da preservação da região.”</p>
            <p>Autor: Henri Cavalheiro</p>
            <div id="buttonDiv">
                <button onclick="Catalogo.modificarItem(this)">
                    <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                </button>
                <button onclick="Catalogo.removerItem(this)">
                    <i class="fa-regular fa-trash-can botaoModifyExcluir"></i>
                </button>
            </div>
        </div>`,

        `<div class="noticia" value="gastronomia">
            <img src="img/gastronomia.webp" alt="Chef finalizando um prato de comida">
            <h5 class="tamanho">Descoberta Culinária!</h5>
            <p>“Chef renomado combina sabores inusitados. O chef premiado traz a fusão surpreendente de ingredientes locais e exóticos em pratos únicos. Desde sushi de abacate a sorvete de manjericão, sua abordagem criativa está redefinindo a experiência gastronômica na cidade."</p>
            <p>Autor: João Barros</p>
            <div id="buttonDiv">
                <button onclick="Catalogo.modificarItem(this)">
                    <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                </button>
                <button onclick="Catalogo.removerItem(this)">
                    <i class="fa-regular fa-trash-can botaoModifyExcluir"></i>
                </button>
            </div>
        </div>`,

        `<div class="noticia" value="politica">
            <img src="img/politica.jpg" alt="Opções renováveis em volta do globo">
            <h5 class="tamanho">Lei para energias renováveis!</h5>
            <p>"Novo Projeto de Lei Busca Impulsionar Energias Renováveis. Uma proposta legislativa recém-apresentada visa incentivar investimentos em energia solar e eólica, visando a sustentabilidade e a redução das emissões. Especialistas veem o projeto como um passo importante em direção a um futuro mais verde e resiliente."</p>
            <p>Autor: Maria Clara</p>
            <div id="buttonDiv">
                <button onclick="Catalogo.modificarItem(this)">
                    <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                </button>
                <button onclick="Catalogo.removerItem(this)">
                    <i class="fa-regular fa-trash-can botaoModifyExcluir"></i>
                </button>
            </div>
        </div>`,

        `<div class="noticia" value="tecnologia">
            <img src="img/tecnologia.webp" alt="Globo interligado pela tecnologia">
            <h5 class="tamanho">Avanço revolucionário!</h5>
            <p>“Empresa de tecnologia revela avanço revolucionário em armazenamento de energia. Novo dispositivo utiliza nanomateriais para alcançar capacidade de armazenamento cinco vezes maior que as baterias atuais, com tempos de recarga reduzidos. A inovação promete transformar setores de eletrônicos e veículos elétricos, impulsionando a transição para fontes de energia limpa.”</p>
            <p>Autor: Osvaldo</p>
            <div id="buttonDiv">
                <button onclick="Catalogo.modificarItem(this)">
                    <i class="fa-regular fa-pen-to-square botaoModifyExcluir"></i>
                </button>
                <button onclick="Catalogo.removerItem(this)">
                    <i class="fa-regular fa-trash-can botaoModifyExcluir"></i>
                </button>
            </div>
        </div>`
        )

    localStorage.ListaCatalogo = JSON.stringify(lista_catalogo)

    Catalogo.atualizar()
}

if (localStorage.ListaCategorias == undefined){
    localStorage.setItem("ListaCategorias", "[]")

    let lista_categorias = JSON.parse(localStorage.ListaCategorias)
    lista_categorias.push(`<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="esporte">Esporte</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`,
    `<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="moda">Moda</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`,
    `<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="gastronomia">Gastronomia</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`,
    `<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="ciencia">Ciência</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`,
    `<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="politica">Política</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`,
    `<div class="botao-categoria"><button onclick="Catalogo.filtrarItens(this)" value="tecnologia">Tecnologia</button><button onclick="sidebar.modificarItem(this)"><i class="fa-regular fa-pen-to-square"></i></button><button onclick="sidebar.removerItem(this)"><i class="fa-regular fa-trash-can"></i></button></div>`,)

    localStorage.ListaCategorias = JSON.stringify(lista_categorias)

    sidebar.atualizar()
}


Catalogo.botao_adicionar.addEventListener("click", function(){Catalogo.adicionarItem()})

sidebar.botao_sidebar.addEventListener("click", function(){sidebar.open_sidebar()})
sidebar.close_sidebar_div.addEventListener("click", function(){sidebar.close_sidebar()})
sidebar.add_categoria.addEventListener("click", function(){sidebar.criar_categoria()})

Catalogo.atualizar()
sidebar.atualizar()

