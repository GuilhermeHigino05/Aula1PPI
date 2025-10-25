import express from 'express';

const host = '0.0.0.0';
const app = express(); //oferecendo ao desenvolvedor um servidor HTTP de mode expresso
const port = 3000;

// recheando o servidor com funcionalidades


app.get('/', (requisicao, resposta) => {
    resposta.send(`
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
    app.get('/horaAtual', (res,resp) => {
        const horaAtual = new Date();
        const hora = horaAtual.getHours() + ":" + horaAtual.getMinutes() + ":" + horaAtual.getSeconds();
        resp.send(`
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
    })

});

app.listen(port, host, () => {
    console.log(`Servidor executando em http://${host}:${port}`);
}); 