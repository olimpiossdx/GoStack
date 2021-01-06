import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (<>
    <img src={logoImg} alt='Github explore' />
    <Title>
      Explore repositórios no GitHub.
  </Title>
    <Form>
      <input placeholder='Digite o nome do repositório' />
      <button type='submit'>
        Pesquisar
      </button>
    </Form>
    <Repositories>
      <a href='teste'>
        <img src={logoImg} alt='Dev' />
        <div>
          <strong>
            texto 1
          </strong>
          <p> texto 2</p>
        </div>
        <FiChevronRight size={20} />
      </a>

      <a href='teste'>
        <img src={logoImg} alt='Dev' />
        <div>
          <strong>
            texto 1
          </strong>
          <p> texto 2</p>
        </div>
        <FiChevronRight size={20} />
      </a>

      <a href='teste'>
        <img src={logoImg} alt='Dev' />
        <div>
          <strong>
            texto 1
          </strong>
          <p> texto 2</p>
        </div>
        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>)
}

export default Dashboard;
