export const ConfirmPayment = (Name: string, Order: {email:string, item:string, description:string, qtd:number, price:number, status:string, date:string, addr:string}) => {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Confirmação de Pagamento</title>
        </head>
        <body>
            <h1>Confirmação de Pagamento</h1>
            <p>Olá ${Name}.
                <br>Informamos que o seu pagamento do pedido ${Order.item} ${Order.description} foi confirmado.
                <br>Agradecemos a preferência.
            </p>
        </body>
        </html>
    `;
}

export const ErrorPayment = (Name: string, Order: {email:string, item:string, description:string, qtd:number, price:number, status:string, date:string, addr:string}) => {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Confirmação de Pagamento</title>
        </head>
        <body>
            <h1>Confirmação de Pagamento</h1>
            <p>Olá ${Name}.
                <br>Informamos que houve um erro no seu pagamento do pedido ${Order.item} ${Order.description}.
                <br>Para mais informações, entre em contato com o fornecedor.
                <br>Agradecemos a preferência.
            </p>
        </body>
        </html>
    `;
}
