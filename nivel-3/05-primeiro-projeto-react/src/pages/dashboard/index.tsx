import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;

  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [repostories, setRepostories] = React.useState<Repository[]>([]);

  async function handleAddRepository(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepostories([...repostories, repository]);
      setNewRepo('');
      setInputError('');

    } catch (error) {
      setInputError('Erro na busca por esse repositório !');
    }
  }

  return (<>
    <img src={logoImg} alt='Github explore' />
    <Title>
      Explore repositórios no GitHub.
  </Title>
    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input
        value={newRepo}
        onChange={(e) => setNewRepo(e.target.value)}
        placeholder='Digite o nome do repositório'
      />
      <button type='submit'>
        Pesquisar
      </button>
    </Form>
    {inputError && <Error>{inputError}</Error>}
    <Repositories>
      {repostories.map(repository => (
        <a href={'teste'}>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>
              {repository.full_name}
            </strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      ))}
    </Repositories>
  </>)
}

export default Dashboard;

