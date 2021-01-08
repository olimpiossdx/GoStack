import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, Issues, RepositoryInfo } from './styles';

import { FiChevronLeft,FiChevronRight } from 'react-icons/fi';
import logoImg from '../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (<>
    <Header>
      <img src={logoImg} alt='Github Explore' />
      <Link to='/'>
        <FiChevronLeft size={16} />
        Voltar
      </Link>
    </Header>

    <RepositoryInfo>
      <header>
        <img src={logoImg} alt='Github Explore' />
      </header>
      <div>
        <strong>rocketseat/unform</strong>
        <p>descrição do repositório</p>
      </div>
      <ul>
        <li>
          <strong>1808</strong>
          <span>starts</span>
        </li>
        <li>
          <strong>48</strong>
          <span>forks</span>
        </li>
        <li>
          <strong>67</strong>
          <span>Issues abertas</span>
        </li>
      </ul>
    </RepositoryInfo>

    <Issues>
      <Link  to={`asd`}>
        <div>
          <strong>
            repository.full_name
          </strong>
          <p>repository.description</p>
        </div>
        <FiChevronRight size={20} />
      </Link>
    </Issues>

  </>)
}

export default Repository;

