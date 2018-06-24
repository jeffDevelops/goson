import styled from 'styled-components';

const Section = styled.section`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
`;

export default Section;