import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 1rem;
  }
`;

export const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 0.2rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    width: auto;
  }
`;
