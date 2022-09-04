const {getSVG,getViewBox } = require("../database/postgres/postgres")

jest.mock("../database/mongodb/mongo",()=>{
    return jest.fn()
})

describe("Testando funções do Postgres", ()=>{
    test("Espero retornar uma string informado que deu certo restagar o svg", async ()=>{
        let req = {
            body:{
                cidade: "Cajazeiras"
            }
        }

        let result  = await getSVG(req)
        expect(result).toBe("Sucesso ao resgatar SVG")
    })

    test("Espero retornar uma string informado que deu certo restagar o ViewBox", async ()=>{
        let req = {
            body:{
                cidade: "Cajazeiras"
            }
        }

        let result  = await getViewBox(req)
        expect(result).toBe("Sucesso ao resgatar ViewBox")
    })
})