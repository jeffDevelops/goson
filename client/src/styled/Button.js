import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 4px;
  padding: 10px 15px;
  border: 3px solid rgba(20, 20, 20, 1);
  outline: none;
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  transition: all .3s;
  cursor: pointer;

  &:hover {
    transition: all .4s;
    background-color: rgba(0, 0, 0, 0);
    color: #111;
  }

  ${props => props.callToAction && css`
    font-size: 4em;
    font-family: 'Ranger';
    padding: 30px 80px;
    border: 3px solid #fff;
    width: 80%;
    display: block;
    width: 80%;
    margin: 0 auto;
    outline: none;

    &:hover,  &:active, &:focus {
      transition: all .4s;
      background-color: rgba(255, 255, 255, 1);
      border-color: rgba(255, 255, 255, 1);
      color: rgba(20, 20, 20, 1);
    }

    @media (max-width: 700px) {
      font-size: 2em;
      padding: 25px;
    }
  `}

  ${props => props.out && css`
    font-size: 4em;
    font-family: 'Ranger';
    padding: 30px 120px;
    color: rgba(20, 20, 20, 1);
    background-color: #fff;
    border-color: rgba(255, 255, 255, 1);

    &:hover {
      transition: all .4s;
      border-color: rgba(255, 255, 255, 0);
      color: rgba(20, 20, 20, .3);
      background-color: rgba(255, 255, 255, .6);
    }
  `}
`;

export default Button;