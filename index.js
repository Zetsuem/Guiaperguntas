const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
// Database
// Estrutura chamada de promisse
connection
    .authenticate()
    // Se a conexão acontecer, o executado será o then
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    // Se não for executada, acontecerá a msg do erro
    .catch((msgerro) => {
        console.log("Tempo esgotado! ! !", msgerro)
    });

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Estou dizendo para o Express usar o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static('public'));

// Rotas 
app.get("/", (req, res) => {
        //metodo referente à: SELECT * FROM perguntas; procura todas as perguntas da tabela e às retorna
        // no findAll é aberto um json em que faz com que seja feita uma pesquisa 'crua' pelos dados.
        Pergunta.findAll({ raw: true, order: [
            ['id', 'DESC']// ASC = CRESCENTE; DESC = DECRESCENTE; pode ser outros atributos, como titulo ou descrição
        ] }).then(perguntas=>{
        // Jogando a var para o front end usando res.render
        res.render("index",{
            perguntas: perguntas
        // Criando uma variavel perguntas, que recebe as perguntas vindas do database
        })
    })  
})


app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //equivalente ao INSERT INTO perguntas dados...Pergunta.
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    //depois de executado redireciona para a pagina / que é a home
    }).then(() => {
        res.redirect("/")
    })   
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.get("/pergunta/:id", (req, res) => {// Para criar parametros no express Colocar :
    var id = req.params.id; // tudo relacionado a uma tabela, chamar um model. Aqui seria 'Pergunta'
    Pergunta.findOne({ // obj json
        where: {id: id} // *Condição where = onde; + nome do campo + valor a se comparar
        //where: {titulo: "Node ou PHP"}
    }).then(pergunta => {
        if(pergunta != undefined){ 
            
            // Irá exibir todas as perguntas com campos 'perguntaId e pergunta.id' iguais
            Resposta.findAll({ raw: true, order: [
            ['id', 'DESC']],
            where: { perguntaId: pergunta.id}
            }).then(respostas => {
            // Se a pergunta for diferente de undef, a pergunta foi achada e será exibida na tela
                res.render("pergunta", {
                pergunta: pergunta,
                respostas: respostas

            });
            });
        }else{ // Não encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId; // pegando o id nessa var

    Resposta.create({ //  criar a resposta
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId) // redirecionar o user para a pagina pergunta + perguntaId
    })
})

// Abertura do Servidor
app.listen(8000, (erro) => {
    if(erro){
        console.log("ERRO !  !  ! ")
    }else{
        console.log("Servidor iniciado corretamente!")
    }
})
