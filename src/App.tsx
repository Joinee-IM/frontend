import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import '@/App.css';

import reactLogo from '@/assets/react.svg';
import viteLogo from '@/assets/vite.svg';

const Container = styled.div`
  width: 100vw;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
  .card {
    padding: 2em;
  }

  .read-the-docs {
    color: #888;
  }
`;

export default function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.detail === 5) {
        navigate('/view');
      }
    });

    // cleanup this component
    return () => {
      window.removeEventListener('click', (e) => {
        if (e.detail === 5) {
          navigate('/view');
        }
      });
    };
  }, [navigate]);

  return (
    <Container>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {/* <p className="read-the-docs">Click on the Vite and React logos to learn more</p> */}
    </Container>
  );
}
