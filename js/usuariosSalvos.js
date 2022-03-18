//Pegando div principal
let divContainer = document.querySelector('#container')

showUsers()

//Função responsável por mostrar usuários na tela
async function showUsers(){
    
    let arrayResults = await returnUsers()
    
    arrayResults.forEach((item, index)=>{
        createElements(item)
        createSVG(item, index)
        createViewBox(item, index)
    })

    let button = document.querySelectorAll('#buttons')
        button.forEach((item, index)=>{
            item.addEventListener('click', (event)=>{
                let content = item.nextElementSibling
                    content.classList.toggle('content--activate')
            })
        })
}

//Função responsável por retornar usuários do banco
async function returnUsers(){
    let arrayResults = fetch("http://localhost:3000/getUsersMongo")
                        .then(result=>{return result.json()})

    let results = []
       await arrayResults.then((result)=>{
            result.forEach(item=>{
                results.push(item)
            })
        })
    
        return results
}

//Função responsável por criar elementos
function createElements(item){
    //Div geral
    let div = document.createElement('div')
        div.classList.add('users')
    //Botão principal
    let button = document.createElement('button')
        button.type = 'button'
        button.textContent = item.name
        button.id = 'buttons'
    //Div onde contém texto sobre cada usário
    let divText = document.createElement('div')
        divText.classList.add('content')
    //Propriedades dos usuários
    let name = document.createElement('p')
        name.innerHTML = `Nome: ${item.name}`
    let email = document.createElement('p')
        email.innerHTML = `Email: ${item.email}`
    let idade = document.createElement('p')
        idade.innerHTML = `Idade: ${item.idade}`
    let cidade = document.createElement('p')
        cidade.innerHTML = `Cidade: ${item.cidade}`
    let relacao = document.createElement('p')
        relacao.innerHTML = `Relação: ${item.relacao}`
    //Adiciona svg para desenhar a cidade dos usuarios
    let svgns = 'http://www.w3.org/2000/svg'
    let svg = document.createElementNS(svgns, 'svg')
        svg.setAttribute('height', 200)
        svg.setAttribute('width', '100%')
    
    let path = document.createElementNS(svgns, 'path')

        svg.appendChild(path)
    
    //Div de operações crud
    let divButtons = document.createElement('div')
        divButtons.id = 'container-buttons'
    //Operação de editar e exluir
    let link_edit = document.createElement('a')
        link_edit.href = '/edit-user'

    let link_delete = document.createElement('a')
        link_delete.addEventListener('click', ()=>{
            if(confirm(`Realmente deseja excluir esta pessoa?\nNome: ${item.name}`)){
                deleteUser(item)
            }
        })
    //Imagens de editar e exluir
    let edit_img = document.createElement('img')
        edit_img.src = 'edit_icon.svg'
        edit_img.classList.add('images-crud')

    let delete_img = document.createElement('img')
        delete_img.src = 'delete_icon.svg'
        delete_img.classList.add('images-crud')
        //Adicionando elementos detro de elementos
        link_edit.appendChild(edit_img)
        link_delete.appendChild(delete_img)

        divButtons.appendChild(link_edit)
        divButtons.appendChild(link_delete)
        divText.appendChild(name)
        divText.appendChild(email)
        divText.appendChild(idade)
        divText.appendChild(cidade)
        divText.appendChild(relacao)
        divText.appendChild(svg)
        divText.appendChild(divButtons)

        div.appendChild(button)
        div.appendChild(divText)
    divContainer.appendChild(div)
}

//Função responsável por retornar o svg da cidade do usuário
async function createSVG(item, index){

    fetch("http://localhost:3000/getSvgPostgres",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify(item)
    }).then(result =>{
        return result.json()
    }).then(resp=>{
        desenhaSVG(resp[0].st_assvg, index)
    })

}

//Função responsável por retornar o viewBox da cidade do usuário
async function createViewBox(item, index){
    fetch("http://localhost:3000/getViewBoxPostgres",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify(item)
    }).then(result =>{
        return result.json()
    }).then(resp=>{
        desenhaViewBox(resp[0].getviewbox, index)
    })
}

//Função responsável por adicionar o viewBox ao svg
function desenhaViewBox(stringViewBox, index){
    let svg = document.querySelectorAll('svg')
        svg[index].setAttribute('viewBox', stringViewBox)
}

//Função responsável por adicionar o path ao svg
function desenhaSVG(stringSvg, index){
    let path = document.querySelectorAll('path')
        path[index].setAttribute('d', stringSvg)
}

//Função responsável por deletar um usuário do mongoDB
function deleteUser(item){
    fetch("http://localhost:3000/deleteUserMongo",{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify(item)
    }).then(resp=>{
        alert('Usuário deletado com sucesso')
        location.reload()
    })
}