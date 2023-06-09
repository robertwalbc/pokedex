import styled from 'styled-components';

export const Title = styled.p`
  font-size: 1.5em;
  text-align: center;
  color: #000000;
`;

export const Container = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: #B0C4DE;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 16px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
