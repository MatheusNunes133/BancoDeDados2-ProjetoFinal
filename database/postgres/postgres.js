require('dotenv').config()

const Client = require('pg').Client
const cliente = new Client({
    user:process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
})

cliente.connect().then().catch(error=>console.log(error))


//Funcção responsável por recuperar o svg do municipio
async function getSVG(req, res){
    const { cidade } = req.body

    try {
        const query = `SELECT ST_AsSVG(geom) FROM municipios WHERE nm_mun ilike '${cidade}'`
        cliente.query(query, (error, results)=>{
            if(error){
                res.status(400).send(error)
            }else{
                res.status(200).json(results.rows)
            }  
        })
        return "Sucesso ao resgatar SVG"
    } catch (error) {
        console.log(error)
    }
}
    
//Funcção responsável por recuperar o viewBox do municipio
async function getViewBox(req, res){
    const { cidade } = req.body
    try {
        const query = `SELECT getViewBox('${cidade}')`
        cliente.query(query, (error, results)=>{
            if(error){
                res.status(400).send(error)
                console.log(error)
                return
            }else{
                return res.status(200).json(results.rows)
            }  
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getSVG,
    getViewBox
}