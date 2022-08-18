import Particles from "react-tsparticles";
import globalParticles from './../../consts/global-particles.const';

import Arena from './../../pages/arena/Arena';
import Header from './../../components/header/Header';

export default function Main() {
  return (
    <>
      <div className='head'>
        <Header />
      </div>

      <div className='content'>
        <Arena />
      </div>

      <Particles
        id="global-particles"
        options={globalParticles}
      />
    </>
  );
}
