import express from 'express';

const host = '0.0.0.0';
const app = express();
const port = 3000;

// rota raiz
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Primeira Página com Express</title>
        </head>
        <body>
            <h1>Olá, Mundo! Esta é minha primeira página com Express!</h1>
            <h2>Olá ben-vindo a pagina inicial</h2>
        </body>
        </html>
    `);
});

// --- FIX: rota /horaAtual estava declarada DENTRO da rota '/' no seu código original.
// Isso fazia com que ela não fosse registrada corretamente. Declaramos fora:
app.get('/horaAtual', (req, res) => {
    const horaAtual = new Date();
    const hora = horaAtual.getHours().toString().padStart(2, '0') + ":" +
                 horaAtual.getMinutes().toString().padStart(2, '0') + ":" +
                 horaAtual.getSeconds().toString().padStart(2, '0');
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hora Atual</title>
        </head>
        <body>
            <h1>Hora Atual</h1>
            <h2>A hora atual é: ${hora}</h2>
        </body>
        </html>
    `);
});

// criar um metodo que aceita parâmetros (tabuada)
// --- FIXES aplicados:
// 1) usei parseInt com base 10 e verifiquei Number.isNaN em vez de testar falsy (pois 0 é falsy).
// 2) declarei 'i' com let no for para evitar variável global.
// 3) tratei sequencia negativa como erro (pode ajustar se desejar comportamento diferente).
app.get('/tabuada', (req, res) => {
    const numero = parseInt(req.query.numero, 10);
    const sequencia = parseInt(req.query.sequencia, 10);

    // validação correta dos parâmetros
    if (Number.isNaN(numero) || Number.isNaN(sequencia)) {
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada - Erro</title>
            </head>
            <body>
                <h1>Erro</h1>
                <h2>Por favor, forneça os parâmetros 'numero' e 'sequencia' na URL (valores numéricos).</h2>
                <h3>Exemplo: /tabuada?numero=5&sequencia=10</h3>
            </body>
            </html>
        `);
        return;
    }

    if (sequencia < 0) {
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada - Erro</title>
            </head>
            <body>
                <h1>Erro</h1>
                <h2>O parâmetro 'sequencia' deve ser um número inteiro não negativo.</h2>
            </body>
            </html>
        `);
        return;
    }

    // construir resposta HTML incrementalmente
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tabuada de ${numero}</title>
    </head>
    <body>
        <h1>Tabuada de ${numero} até ${sequencia}</h1>
        <ul>
    `);

    // declarar i com let para evitar leak global e iterar corretamente
    for (let i = 0; i <= sequencia; i++) {
        const resultado = numero * i;
        res.write(`<li>${numero} x ${i} = ${resultado}</li>`);
    }

    res.write(`
        </ul>
    </body>
    </html>
    `);
    res.end(); // finaliza e envia a resposta

    console.log("Requisicao tabuada");
});

app.listen(port, host, () => {
    console.log(`Servidor executando em http://${host}:${port}`);
});