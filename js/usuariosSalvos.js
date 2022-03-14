//Pegando div principal
let divContainer = document.querySelector('#container')

showUsers()

//Função responsável por mostrar usuários na tela
async function showUsers(){
    
    let arrayResults = await returnUsers()
    
    arrayResults.forEach(item=>{
        createElements(item)
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
    let arrayResults = fetch("http://localhost:3000/getUsers")
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
    //Div de operações crud
    let divButtons = document.createElement('div')
        divButtons.id = 'container-buttons'
    //Operação de editar e exluir
    let link_edit = document.createElement('a')
        link_edit.href = '/edit-user'

    let link_delete = document.createElement('a')
        link_delete.href = '/delete-user'
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

        divText.appendChild(divButtons)

        div.appendChild(button)
        div.appendChild(divText)
    divContainer.appendChild(div)
}