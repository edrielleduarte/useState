# HONKS - USESTATES

### Estado
O estado de uma aplicação representa as características dela naquele momento. Por exemplo: os dados do usuário foram carregados, o botão está ativo, o usuário está na página de contato e etc.

        const App = () => {
        const ativo = true;

        return (
                <button disabled={!ativo}>{ativo ? 'Botão Ativo' : 'Botão Inativo'}</button>
        );
        };

* Disabled desativa o botão ou ativa conforme se for true ou falso

 - Estado do botão ao clicar pra funcionar o hook

        const App = () => {
        const [ativo, setAtivo] = useState(false)

        function handleClick () {
            setAtivo(!ativo)
        }
        return (
            <button onClick={handleClick}> { ativo ? 'Ativo' : 'Inativo' } </button>
        )
        };


Podemos ter um objeto nos hoonks, como abaixo e passar seus valores, posso mudar e acrescentar novos valores, conforme abaixo:


        const App = () => {
            const [ativo, setAtivo] = useState(false)
            const [dados, setDados] = useState({ nome: 'Edrielle', idade: '26' })

            function handleClick () {
                setAtivo(!ativo)
                setDados({...dados, faculdade: 'Analise Desenvolvimento', nome: 'Rose'})  // aqui vem a desustruração conforme o props.
            }
            return (
                <div>
                    <p> { dados.nome }</p>
                    <p> { dados.idade } </p>
                    <p>{  dados.faculdade } </p>
                    <button onClick={handleClick}> { ativo ? 'Ativo' : 'Inativo' } </button>
                </div>
            )
        };


<b>Props</b>

Podemos passar o estado e a função de modificação como propriedades para outros elementos.

        App.js

        import React from 'react';
        import Modal from './Modal';
        import ButtonModal from './ButtonModal';

        const App = () => {
        const [modal, setModal] = React.useState(false);

        return (
            <div>
            <Modal modal={modal} setModal={setModal} />
            <ButtonModal setModal={setModal} />
            </div>
        );
        };

        export default App;



        ButtonModal.js

        import React from 'react'

            const ButtonModal = ({ setModal }) => {
            return (
                <button onClick={() => setModal(true) }>Abrir</button>
            )
            }

        export default ButtonModal


        Modal.js

        import React from 'react'

        const Modal = ({ modal, setModal }) => {

            if(modal === true)
            return (
                <div> Esse é um modal. <button onClick={() => setModal(false)}>Fechar</button></div>
            )
            return null
        }

        export default Modal


<b>Reatividade</b>

Não modifique o estado diretamente. Utilize sempre a função de atualização do estado, pois ela que garante a reatividade dos componentes.


            const App = () => {
            const [modal, setModal] = useState(false);
            const [items, setItems] = useState('Teste')

            function handleClick() {
                setItems('Outro')
            }

                return (
                <div>
                    <p>{ items} </p>
                    <button onClick={handleClick}> Clicar </button>
                )


<b>Callback</b>
Podemos passar uma função de callback para atualizar o estado. A função de callback recebe um parâmetro que representa o valor anterior e irá modificar o estado para o valor que for retonado na função.


        const ButtonModal = ({ setModal }) => {

            function handleClick(){
                setModal((ativo) => !ativo)
            }

            return (
                <button onClick={ handleClick}>Abrir</button>
            )
        }


* Tipos callback:

            const [modal, setModal] = useState(() => {
                const ativo = window.localStorage.getItem('ativo');
                return ativo;
            });



<b>React.StrictMode</b>


O modo estrito invoca duas vezes a renderização do componente, quando o estado é atualizado. Assim é possível identificarmos funções com efeitos coláterais (side effects) e eliminarmos as mesmas.

Funções com efeitos coláterais são aquelas que modificam estados que estão fora das mesmas.


* EXEMPLO:


            const App = () => {

            const [contar, setContar] = useState(1)
            const [items, setItems] = useState(['Item 1'])

            function handleClick (){
                setContar((contar) => 
                { setItems((items) => [...items, 'Item' + (contar + 1)])
                return contar + 1 
                })
            }
            return (
                <div>
                    { items.map(item => <li key={item}> {item} </li>)}
                    <button onClick={handleClick}>{ contar }</button>

                </div>
            )
            };

            export default App;

O resultado pode ser duplicado os nomes items na tela devido o  react strict mode, se tirar, a função so renderiza uam vez.

Para não ocorrer jogamos essa função para o lado de fora:

    
* EXEMPLO 2:


            const App = () => {

            const [contar, setContar] = useState(1)
            const [items, setItems] = useState(['Item 1'])

            function handleClick (){
                setContar((contar) => 
                { 
                    return contar + 1 
                })

                setItems((items) => [...items, 'Item' + (contar + 1)])  // essa parte
            }
            return (
                <div>
                    { items.map(item => <li key={item}> {item} </li>)}
                    <button onClick={handleClick}>{ contar }</button>

                </div>
            )
            };

            export default App;


Não precisamos do return contar + 1, diretamente sem ele vai:

            function handleClick (){
                setContar((contar) => 
                    contar + 1 
                );
                setItems((items) => [...items, 'Item ' + (contar + 1)])
            }

        
        * OUTRA SOLUÇÃO PASSAR DIRETAMENTE SEM FUNCTION 

            setContar(contar + 1)


Items também:

        setItems([...items, 'Item ' + (contar + 1))