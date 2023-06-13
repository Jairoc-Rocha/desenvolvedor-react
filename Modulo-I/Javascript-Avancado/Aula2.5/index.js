let Carro = {
    propriedade: "Fernanda",
    ano: 2026
}

const handler = {
    get (target, property) {
        console.log(`GET ${property}`)
        if (property in target) {
            return target[property]
        }
        return "Proprieda inexistente"
    }
}

let carroProxy = new Proxy(Carro, handler)

console.log(Carro.modelo)
console.log(carroProxy.modelo)


// Exemplo Proxy para tradutor
let tradutor = {
   "Carro": "Car",
   "Ano": "Year" 
}

let handleTradudor = {
    get (target, property) {
        if (property in target) {
            return target[property]
        } else {
            return property
        }    
    },
    set (target, property, value) {
        if (typeof value === "string") {
            target[property] = value
            return true
        } else {
            return false
        }
    }
}


let tradutorProxy = new Proxy(tradutor, handleTradudor)

console.log(tradutorProxy["Carro"])
console.log(tradutorProxy["Modelo"])

tradutorProxy["Modelo"] = "Model"
tradutorProxy["Marca"] = 123456

console.log(tradutorProxy["Modelo"])
console.log(tradutorProxy["Marca"])