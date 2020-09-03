/* eslint-disable camelcase */
import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo_github.svg';
import api from '../../services/api';
import { Title, Form, Repositories } from './styles';

interface OwnerRepositoryData {
  avatar_url: string;
  login: string;
}

interface RepositoryData {
  description: string;
  full_name: string;
  owner: OwnerRepositoryData;
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Array<RepositoryData>>([]);
  const [newRepo, setNewRepo] = useState('');

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await api.get<RepositoryData>(`/repos/${newRepo}`);
    const repository = response.data;
    setNewRepo('');
    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={({ target }) => {
            setNewRepo(target.value);
          }}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a href="teste" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
