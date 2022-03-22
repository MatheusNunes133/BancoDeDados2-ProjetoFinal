function createRelation(){
    let firstEmail = document.querySelector('#firstEmail').value
    let secondEmail = document.querySelector('#secondEmail').value
    let relationshipType = document.querySelector('#relationship').value

    let objInfo = {
        firstEmail,
        secondEmail,
        relationshipType
    }

    let nullValues = findNullValues(objInfo)
    
    if(nullValues == 0){
        fetch("http://localhost:3000/save-relationship-neo4j",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(objInfo)
        }).then(result=>{
            if (result.status == 200){
                alert('Relação adicionada com sucesso!')
                resetCamps()
            }else{
                alert('Falha ao adicionar relacionamento')
            }
        }).catch(error=>{
            console.log(error)
        })
    }else{
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
    firstEmail.value = ''
    secondEmail.value = ''
    relationshipType.value = ''
}