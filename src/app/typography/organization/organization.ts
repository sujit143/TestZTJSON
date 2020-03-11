export class Organization {
  public constructor(
    public id: number,
    public name: string,
    public description: string,
    public registeredaddress1: string,
    public registeredaddress2: string,
    public city: string,
    public state: string,
    public zip: string,
    public country: string,
    public website: string,
    public phone1: string,
    public phone2: string,
    public fax: string,
    public isactice: boolean,
    public createdby: number,
    public createddate: Date,
    public modifiedby: number,
    public modifieddate: Date
  ) { }
}
