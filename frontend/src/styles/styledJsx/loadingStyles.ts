import css from 'styled-jsx/css';

export const loadingStyles =css`
  .tr-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1200;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .tr-loading-text {
    text-align: center;
    color: white;
    font-size: 3rem;
    margin-top: 45vh;
  }
`