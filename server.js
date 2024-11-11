import { fastify } from "fastify"
import { dbmemory } from "./database.js"

const server = fastify()
const db = new dbmemory()
const PORT = 3333

server.post("/produtos", (req, reply) => {
    const { nome, preco, quantidade } = req.body
    db.insert({
        nome,
        preco,
        quantidade
    })
    return reply.status(201).send()
})

server.get("/produtos", (req, reply) => {
    const produtos = db.select_all()
    return produtos
})

server.get("/produtos/:id", (req, reply) => {

})

server.put("/produtos/:id", (req, reply) =>{

})

server.delete("/produtos/:id", (req, reply) => {

})

server.listen({
    port: PORT
}, () =>{
    console.log("Server iniciado.")
})