import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo_github.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/63209462?s=460&u=df54d99538ae00bba4485dea1c8eda3bc33cfe0e&v=4"
            alt="Samuel Santos"
          />
          <div>
            <strong>busca-de-bancos</strong>
            <p>
              Repositório responsável por armazenar o projeto desenvolvido
              durante a Next Level Week #1 na trilha omnistack
            </p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
