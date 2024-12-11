import React from 'react';
import './style.css';

const Header = () => {
    return (
        <header>
                    
            <div className='header-center'>
                <picture>
                    <img src='./assets/LOGOTS.png' alt='logo otica'/>
                </picture>

                <nav>
                 <ul>
                        <li>
                            <a href='/Produtos'>Valores</a>
                        </li>

                        <li>
                            <a href='/SecaoSobre'>Sobre</a>
                        </li>

                        <li>
                            <a href='/Paginas'>Cadastro</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;