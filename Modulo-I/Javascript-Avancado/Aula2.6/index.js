// EXEMPLO DE CURRYING
function log(date,type, message) {
    console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}] ${message}`)
}

log(new Date(), "DEBUG", "Exemplo de Currying")

const logCurrying = date => type => message => console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}] ${message}`)

logCurrying(new Date())("DEBUG") ("Exemplo novo de Currying")

let logNow = logCurrying(new Date())
logNow("DEBUG")("Exemplo de Currying com parametro fixo")