import { Department } from './department';

// import { MemberRole } from '../dashboard/memberrole';
export class Member {
public constructor(
public memberId:number,
public loginName:string,
public loginPassword:string,
public profilePhoto:string,
public firstName:string,
public middleName:string,
public lastName:string,
public fullName:string,
public displayName:string,
public gender:string,
public dob:Date,
public address:string,
public city:string,
public state:string,
public zipCode:string,
public country:string,
public email:string,
public isActive:boolean,
public registerdDate:Date,
public statusId : number,
public verificationToken:String,
// Public Roles:number,
public location :string,
public associatedDepartment:string,
public departmentName:string,
public locationName:string,
public reportingManager:string,
public designation:string,
public reportingSince:Date,
public cell:string,
public workPhone:string,
public workPhoneExt:string,
public homePhone:string,
public doj:Date,
public orgName:string,
public orgId:number,
public modifiedBy:number,
public supervisor:string,
public race:string,
public ethnicity:string,
public maritalStatus:string,
public language:string,
public ssn:string,

// public role:MemberRole,
public AssociatedDepartments:Department

) { }


}
