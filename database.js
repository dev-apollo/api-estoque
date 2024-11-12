import { randomUUID } from "crypto"

export class dbmemory {
    #produtos = new Map()

    insert(produto){
        this.#produtos.set(randomUUID(), produto)
    }

    select_all(){
        return Array.from(this.#produtos.entries()).map((produtos) => {
            const id = produtos[0]
            const valores = produtos[1]
            return {
                id,
                ...valores
            }
        })
    }

    select_one_by_id(id_inserido){
        const produto = this.#produtos.get(id_inserido)
        if(produto){
            return {
                id: id_inserido,
                ...produto
            }
        }
        return null
    }

    delete(id_inserido){
        if(this.#produtos.has(id_inserido)){
            this.#produtos.delete(id_inserido)
            return true
        }else{
            return false
        }
    }

    update(id_inserido, produto){
        if(this.#produtos.has(id_inserido)){
            this.#produtos.set(id_inserido, produto)
            return true
        }else{
            return false
        }
    }
}