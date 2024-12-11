import React from 'react';
import './style.css'

const SecaoSobre = () => {
    return (
    <section id='sobre'>
        <div className='sobre center'>
            <h2>SOBRE NÓS</h2>
                <p>A Truck Stop foi criada por nós, quatro estudantes do IFSP Caraguatatuba, com o objetivo de reduzir os acidentes envolvendo caminhões no Brasil. Sabemos que muitos desses acidentes poderiam ser evitados com pausas adequadas para descanso e reabastecimento dos motoristas, garantindo que eles estejam mais atentos e descansados durante as viagens.
</p>
        

        <div className='elementos-sobre'>
            <picture>
                <img src='./assets/loja.png' 
                alt='Nossa loja'/>
            </picture>
        

        <div className='sobre-elementos primeiro-sobre'>
            <h4>NOSSAS FILIAIS</h4>
            <p>
                Hoje temos mais de 10 filiais pelo Brasil
            </p>
        </div>

        <div className='sobre-elementos'>
            <h4>NOSSA MISSÃO</h4>
            <p>
                Nossa missão é oferecer espaços seguros e confortáveis para que os motoristas possam descansar, reabastecer e seguir suas jornadas com mais segurança e bem-estar. A Truck Stop é uma solução pensada para proteger vidas e melhorar a qualidade de vida de quem está nas estradas.
            </p>
            </div>
        
        <picture>
            <img src='./assets/atendimento.png' alt='Atendimento'/>
        </picture>
        
        </div>
        </div>
    </section>
    )
}

export default SecaoSobre;