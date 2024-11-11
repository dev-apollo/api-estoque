import { randomUUID } from "crypto"

export class dbmemory {
    #produtos = new Map()

    insert(produto){
        this.#produtos.set(randomUUID(), produto)
    }

    select_all(){
        return Array.from(this.#produtos.values())
    }
}