import styled from 'styled-components';
import { backgroundGrey } from '../../config/styles/colors';

export const AppContainerComponent: any = styled.div`
  flex: 1;
  background-color: ${backgroundGrey};
  min-height: 100vh;
  width: calc(100% - 200px);
  padding: 0 100px;
`;
