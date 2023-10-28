import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useClick() {
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
}
