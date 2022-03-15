function editUser(){
    let userName = document.querySelector('#userName').value
    let userOldEmail = document.querySelector('#userOldEmail').value
    let userNewEmail = document.querySelector('#userNewEmail').value
    let userIdade = Number(document.querySelector('#userIdade').value)
    let userCidade = document.querySelector('#userCidade').value

    let objInfo = {
        name: userName,
        oldEmail: userOldEmail,
        newEmail: userNewEmail,
        idade: userIdade,
        cidade: userCidade
    }

    let nullValues = findNullValues(objInfo)
    
    if(nullValues == 0){
        fetch("http://localhost:3000/updateUserMongo",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(objInfo)
        }).then(result=>{
            if(result.status == 200){
                alert('Usuário alterado com sucesso!')
                resetCamps()
            }else{
                alert('Já existe um usuário cadastrado com esse email!')
                resetCamps()
            }
        }).catch(error=> console.log(error))
    }
    else{
        alert('Existe Algum campo Vazio')
    }
}

//Função responsável por achar campos que estão vazios no formulário
function findNullValues(obj){
    let count = 0
    for(let prop in obj){
        if(obj[prop] == ''){
            count++
        }
    }
    return count
}

//Função responsável por resetar os campos do formulário
function resetCamps(){
    userName.value = ''
    userEmail.value = ''
    userIdade.value = ''
    userCidade.value = ''
}