export class Designation {
  public constructor(
  public id: number,
  public organizationId: number,
  public name: string,
  public description: string,
  public isactive: boolean,
  public createdby: number,
  public createddate: Date,
  public modifiedby: number,
  public modifieddate: Date

  ) { }
  }
