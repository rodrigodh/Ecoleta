import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import Lottie from 'lottie-react-web';
import animation from '../../assets/checkAnimation.json';

const CreatedPoint = () => {
  const history = useHistory();
  setTimeout(function(){ history.push('/'); }, 4000);

  return(
    <div id="page-created-point">
      <div id="content">
        <Lottie
          options={{
            animationData: animation,
            loop: false,
          }}
          height="200px"
          width="200px"
        />
        <h1>Cadastro Concluido!</h1>
      </div>
    </div>
  );
}

export default CreatedPoint;