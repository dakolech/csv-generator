import * as R from 'ramda';
import styled from 'styled-components';
import { yellow } from '../../config/styles/colors';

export const TitleComponent: any = styled.span`
  font-size: ${(props: any) => props.big ? 40 : 20}px;
  color: ${R.propOr(yellow, 'color')};
  font-weight: 600;
  line-height: ${(props: any) => props.big ? 46 : 26}px;
  text-transform: ${(props: any) => props.big ? 'uppercase' : 'capitalize'};
  text-align: center;
`;
