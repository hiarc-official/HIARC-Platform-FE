export interface MyAttendanceProps {
  totalRound?: number | null;
  attenance?: boolean[] | null;
}

export class MyAttendance{
  private readonly props:MyAttendanceProps;
  constructor(props:MyAttendanceProps){
    this.props={...props};
  }

  get totalRound(): number|null|undefined{
    return this.props.totalRound;
  }

  get attendance():boolean[]|null|undefined{
    return this.props.attenance;
  }
  
  toJson():MyAttendanceProps{
    return{
      ...this.props,
    }
  }
}
