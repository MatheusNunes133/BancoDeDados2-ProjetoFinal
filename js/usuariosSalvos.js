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
    let div = document.createElement('div')
            div.classList.add('users')
        
        let button = document.createElement('button')
            button.type = 'button'
            button.textContent = item.name
            button.id = 'buttons'
        
        let divText = document.createElement('div')
            divText.classList.add('content')

        let name = document.createElement('p')
            name.innerHTML = `Nome: ${item.name}`
        let email = document.createElement('p')
            email.innerHTML = `Email: ${item.email}`
        let idade = document.createElement('p')
            idade.innerHTML = `Idade: ${item.idade}`
        let cidade = document.createElement('p')
            cidade.innerHTML = `Cidade: ${item.cidade}`

        
/*         let img = document.createElement('img')
            img.src = 'edit_icon.svg'
            img.classList.add('images-crud') */


            divText.appendChild(name)
            divText.appendChild(email)
            divText.appendChild(idade)
            divText.appendChild(cidade)
        
            div.appendChild(button)
           /*  div.appendChild(img) */
            div.appendChild(divText)
        divContainer.appendChild(div)
}