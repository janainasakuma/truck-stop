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
                            <a href='#'>Valores</a>
                        </li>

                        <li>
                            <a href='#'>Sobre</a>
                        </li>

                        <li>
                            <a href='#'>Cadastro</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;