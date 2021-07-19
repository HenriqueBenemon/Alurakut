import { SiteClient } from 'datocms-client';

export default async function getRequests(request, data){
    if(request.method === 'POST'){
        const TOKEN = "5293fd1f3e71ff440782554616a33f";
        const client = new SiteClient(TOKEN);
        
        // IMPORTANTE MAS NÃO FEITO 
        // Validar os dados antes de sair cadastrando
        const requestCreated =  await client.items.create({
            itemType: "968559", // Id do model de "Communities" criado pelo Dato
            ...request.body,

            // title: "Comunidade Teste", //titulo da comunidade
            // imageUrl: "https://github.com/henriqueBenemon.png",
            // creatorSlug: "henriquBenemon"
        })

        data.json({
            dadosComunidade: requestCreated,
        })
        
        return;
    }
    data.status(404).json({
        data: "Error 404 - Page Not Found"
    })
}