import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CY = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = 'https://ph.sakuras.in/share/jjunwJOWLm08ADa96eBAmjPJ5uqRbiOuLbzoPCv2qdFjI69Y35Uo-ee6KZay_Ma1TQ0';
  }, [navigate]);

  return <p>正在跳转, 请稍候...</p>;
};

export default CY;