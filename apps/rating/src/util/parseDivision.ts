import { Division } from '../types/DataType';

export const parseDivisionString = (divisionString: string): Division => {
  switch (divisionString) {
    case 'DIV_1':
      return Division.DIV_1;
    case 'DIV_2':
      return Division.DIV_2;
    case 'DIV_3':
      return Division.DIV_3;
    default:
      return Division.DIV_1; // 기본값
  }
};

export const getDivisionNumber = (division: Division): number => {
  return division as number;
};