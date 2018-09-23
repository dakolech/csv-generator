import * as R from 'ramda';
import styled from 'styled-components';

export const ContainerComponent: any = styled.div`
  flex: 1;
  flex-direction: ${R.propOr('row', 'direction')};
  display: flex;
`;
