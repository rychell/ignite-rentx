

Erro na lógica
    Não deu certo com && ai trocou para || e o teste passou, mas a lógica ficou errada.
https://app.rocketseat.com.br/node/chapter-iv-2/group/carros/lesson/continuacao-da-listagem-de-carros-disponiveis

inseriu o dayjs direto no código sem criar uma util ou algo do tipo para isolar a biblioteca do código

Olá equipe Rocketseat,

Esse é um feedback em relação ao curso de NodeJS do Ignite.

Minha motivação em escrever esse feedback é por que sou um fã do trabalho de vocês e acho que só conseguimos melhorar ao receber feedbacks.

Consumo o conteúdo da Rocketseat ja faz algum tempo e sempre me ajudou muito. A qualidade do conteúdo gratuito me motivou bastante a comprar o curso do Ignite, trilha de ReactJS e NodeJS. Meu maior interesse em ambos os cursos eram os testes automatizados. 

Iniciei as duas trilhas ao mesmo tempo e isso nao tava dando muito certo então mas decidi focar primeiro em concluir o NodeJS e em seguida iria voltar para o React.

Atualmente estou finalizando o Chapter IV onde foi visto TDD, testes unitários e testes de integração. E confesso que fiquei decepcionado em vários momentos. Uma das premissas do TDD é ver o teste falhar e isso não vimos durante a criação dos testes. Espero estar errado e o problema ser só comigo, mas acredito que todos os testes que foram implementados que esperam um erro ( expect(...).rejetcs()...) estão errados. E se assim for, isso é grave. Há alguns testes onde não foi testado o que era para ser testado. Um exemplo disso era o useCase de listar apenas os carros disponíveis onde o teste não é capaz de validar de fato se o recurso está funcionando, pois não tinha nenhum carro indisponível para validar se este não iria vir na listagem. Ainda nessa aula de listar carros disponíveis, havia um método que deveria buscar pelo nome ou marca ou categoria se não me engano e a regra de negocio no repositório in-memory foi implementada errada. Teria sido possível identificar esse erro nos testes se houvesse um carro indisponível cadastrado.

Meu feedback/solicitação é que fosse revisto esse conteúdo em relação aos testes que deveriam capturar um erro (rejects) para ver se eles falham caso, por exemplo, dentro do teste de criação de categoria que deve dar erro caso seja cadastrada uma categoria com o nome de uma categoria já cadastrada. Nesse teste, tente criar apenas uma categoria e ver se o teste falha (o meu aqui passa). Se for identificado que de fato o teste não é válido, seria muito interessante entrar na trilha de node algum conteudo extra focado em testes.


Esse era o meu feedback, espero não tá passando vergonha e ter feito besteira aqui do meu lado e ta tirando conclusões erradas (ou preciptadas, pois não terminei ainda e tudo isso pode ter sido corrigido nas aulas finais) sobre o conteudo do curso.

Fico a disposição para conversar mais sobre o assunto



trabalhar com Transactions. No modulo 5 houve um exemplo de setar o carro como indisponível mas nada garantia que a outra operação iria funcionar.

