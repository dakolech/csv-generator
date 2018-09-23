import * as R from 'ramda';
import styled from 'styled-components';

export const RowComponent: any = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  margin: 5px 0;
  justify-content: ${R.propOr('center', 'justify')};
  flex-direction: ${R.propOr('row', 'direction')};
`;
