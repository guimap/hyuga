# Hyuga 
![](https://media.giphy.com/media/oQ2GwxCkH6vv2/source.gif)

# Descrição
Crawler para captura de novas midias, utilizando como fonte data sources já cadastrados.

# Have fun
> `npm start` Roda o menino 
> `npm start-dev` Roda o menino com o nodemon, saca ?

# Função
A partir de uma rota fornecida, o crawler irá procurar o episodio do anime nos sites pré definidos, recebendo um parametro mais ou menos como esse:
```
[
    {
        _id: 'example1',
        name: 'Naruto Shippuden',
        episode: 100,
        datasource: 'uol'
    },
    {
        _id: 'example2',
        name: 'One piece',
        episode: 999999,
        datasource: 'animesonline'
    }
]
```
A partir dai ele vai percorrer item por item a procurando o episodio no datasource especificado. Para cada datasource será implementado uma lógica de crawler diferente.
Quando ababar o batch de crawler, ele dispara pra outro microserviço que faz a atualização dos animes enviados seguindo a seguinte estrutura
```
[
    {
        _id: 'example1'
        anime: 'Naruto Shippuden',
        episode: 100,
        datasource: 'uol',
        links: [
            'http://uol.com.br/naruto-shippuden-100',
            'http://uol.com.br/naruto-shippuden-1-100',
        ]
    },
    {
        _id: 'example2',
        anime: 'One piece',
        episode: 999999,
        datasource: 'animesonline',
        links: [
            'http://animesonline.com.br/naruto-shippuden-100',
            'http://animesonline.com.br/naruto-shippuden-1-100',
        ]
    }
]
```