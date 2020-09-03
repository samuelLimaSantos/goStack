/* eslint-disable camelcase */
import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo_github.svg';
import api from '../../services/api';
import { Title, Form, Repositories, Error } from './styles';

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
  const [repositories, setRepositories] = useState<Array<RepositoryData>>(
    () => {
      const storagedRepositories = localStorage.getItem(
        '@GithubExplorer:repositories',
      );

      if (storagedRepositories) {
        return JSON.parse(storagedRepositories);
      }
      return [];
    },
  );
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<RepositoryData>(`/repos/${newRepo}`);
      const repository = response.data;
      setNewRepo('');
      setInputError('');
      setRepositories([...repositories, repository]);
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
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
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            to={`/repository/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
