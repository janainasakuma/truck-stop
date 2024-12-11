import React from "react";
import './style.css';

const Produtos = () => {
    return (
        <section id="produtos">
            <div className="secao-produtos center">
            <h2 className="titulos">COMO FUNCIONA</h2>
            <p className="paragrafo">
            Se o motorista localizar a Truck Stop, é preciso ele se dirigir ao local e se nao tiver cadastro, ira fazer com nossa recepcionista, pratico e rapido, se ele tem o cadastro, apenas dira lo e escolhera sua diaria, ou se quiser, podera dar uma olhada nos nossos pacotes fidelidade.
            </p>
            <h2 className="titulos">VALORES</h2>
            <div className="oculos-img">
                <div className="card-oculos">
                    <h3>Plano Premium</h3>
                    <picture>
                        <img src="./assets/oculos01.png" alt="Óculos de grau"></img>
                    </picture>
                    <p>R$ 550,00</p>
                </div>

                <div className="card-oculos">
                    <h3>Anual</h3>
                    <picture>
                        <img src="./assets/oculos02.png" alt="Óculos de grau"></img>
                    </picture>
                    <p>R$ 1.550,00</p>
                </div>

                <div className="card-oculos">
                    <h3>6 Meses</h3>
                    <picture>
                        <img src="./assets/oculos03.png" alt="Óculos de grau"></img>
                    </picture>
                    <p>R$ 750,00</p>
                </div>

                <div className="card-oculos">
                    <h3>Diária</h3>
                    <picture>
                        <img src="./assets/oculos04.png" alt="Óculos de grau"></img>
                    </picture>
                    <p>R$ 250,00</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Produtos;