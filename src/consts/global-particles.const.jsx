export default {
  retina_detect: true,
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 1500
      }
    },
    color: {
      value: '#2096ff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#fffff'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.02,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 31.565905665290902,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 205.17838682439088,
      color: '#ffffff',
      opacity: 0.07891476416322726,
      width: 0.6313181133058181
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  }
}