import { fastify } from "fastify"
import * as yup from "yup"
import { dbmemory } from "./database.js"

const server = fastify()
const db = new dbmemory()
const PORT = 3333

let schema = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.number().required().positive(),
    quantidade: yup.number().required().integer().moreThan(-1)
})

server.post("/produtos", async (req, reply) => {
    const { nome, preco, quantidade } = req.body
    try {
        await schema.validate({ nome, preco, quantidade })
        db.insert({
            nome,
            preco,
            quantidade
        })
        return reply.status(201).send({message: "Produto cadastrado."})
    }catch(error){
        return reply.status(400).send({ message: "Informações fora do padrão aceito." })
    }
})

server.get("/produtos", (req, reply) => {
    const produtos = db.select_all()
    if(produtos.length > 0){
        return produtos
    }else{
        reply.status(200).send({message: "Não há produtos cadastrados."})
    }
})

server.get("/produtos/:id", (req, reply) => {
    const produto = db.select_one_by_id(req.query.id)
    if(produto){
        return produto
    }else{
        reply.status(404).send({message: "Produto não encontrado."})
    }
})

server.delete("/produtos/:id", (req, reply) => {
    const produto = db.delete(req.query.id)
    if(produto){
        reply.status(200).send({message: "Produto deletado."})
    }else{
        reply.status(404).send({message: "Produto não encontrado."})
    }
})

server.put("/produtos/:id", async (req, reply) =>{
    const id = req.query.id
    const { nome, preco, quantidade } = req.body
    try{
        await schema.validate({ nome, preco, quantidade })        
        const produto = db.update(id, {
            nome,
            preco,
            quantidade
        })
        if(produto){
            return reply.status(200).send({message: "Produto atualizado."})
        }else{
            reply.status(404).send({message: "Produto não encontrado."})
        }
    }catch(error){
        reply.status(400).send({message: "Informações fora do padrão aceito."})
    }
})

server.listen({
    port: PORT
}, () =>{
    console.log("Server iniciado.")
})