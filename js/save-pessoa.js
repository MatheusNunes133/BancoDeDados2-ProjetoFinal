function saveUser(){
    let userName = document.querySelector('#userName').value
    let userEmail = document.querySelector('#userEmail').value
    let userIdade = Number(document.querySelector('#userIdade').value)
    let userCidade = document.querySelector('#userCidade').value

    let cidade = cityName(userCidade)

    let objInfo = {
        name: userName,
        email: userEmail,
        idade: userIdade,
        cidade,
    }

    let nullValues = findNullValues(objInfo)
    
    if(nullValues == 0){
        fetch("http://localhost:3000/saveNewUserMongo",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(objInfo)
        }).then(result=>{
            if(result.status == 200){
                alert('Usuário salvo com sucesso!')
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

//Função que Ajusta o nome da cidade
function cityName(text) {
    let loweredText = text.toLowerCase();
    let words = loweredText.split(" ");
    for (let i = 0; i < words.length; i++) {
        let letter = words[i];

        let firstLetter = letter[0];
        letter = firstLetter.toUpperCase() + letter.slice(1);

        words[i] = letter;
    }
    return words.join(" ");
}