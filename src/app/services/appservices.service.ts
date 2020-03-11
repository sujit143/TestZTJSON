import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpEventType } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { CommonHttpService } from "../shared/common-http.service";
import { Observable } from "rxjs";
import { AppConstant } from "../app.constant";

@Injectable({
  providedIn: 'root'
})
export class AppservicesService {

  percentDone;
  uploadSuccess = false;

  api_url_Settings: string;
  appendpoint: string;
  cpDefaultUrl: string;
  cpDefaultUpdateUrl: string;
  SERVER_URL_GET_DESG;
  SERVER_URL_GET_DEPT;
  SERVER_URL_GET_LOC;
  SERVER_URL_INSERT_UPDATE_DESG;
  SERVER_URL_DESG_DEL: string;

  SERVER_URL_GET_USER;
  SERVER_URL_GET_USER_BY_PAGE;
  SERVER_URL_GET_MEM;
  SERVER_URL_DEPT_DEL: string;
  SERVER_URL_GET_DOC: string;
  SERVER_URL_DOC_ADD: string;
  SERVER_URL_DOC_Del: string;
  api_url_Member;
  appendpoint_member;
  SERVER_URL_INSERT_ADD_DEPT;
  SERVER_URL_DEL_LOC;
  SERVER_URL_DEL_DEPT;
  SERVER_URL_INSERT_ADD_DOC;
  SERVER_URL_DEL_DOC;
  SERVER_URL_INSERT_ADD_LOC;
  SERVER_URL_ORG: string;
  SERVER_URL_ORG_ADD: string;
  SEREVER_URL_SEARCH_USERS;
  SEREVER_URL_DELETE_USER;


  constructor(private http: HttpClient, private CommonHttpService: CommonHttpService) {
    this.api_url_Settings = AppConstant.API_ENDPOINT;
    this.api_url_Member = AppConstant.API_ENDPOINT;
    this.appendpoint = this.api_url_Settings;
    this.appendpoint_member = this.api_url_Member;
    this.SERVER_URL_GET_DESG = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETDESIGNATION;
    this.SERVER_URL_GET_DEPT = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETDEPARTMENT;

    this.SERVER_URL_GET_LOC = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETLOCATIONS;
    this.SERVER_URL_INSERT_ADD_DEPT = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTDEPARTMENT;

    this.SERVER_URL_DEPT_DEL = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.DELETEDEPARTMENT;
    this.SERVER_URL_INSERT_UPDATE_DESG = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTDESIGNATION;

    this.SERVER_URL_DESG_DEL = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.DELETEDESIGNATION;
    this.SERVER_URL_GET_MEM = this.appendpoint_member + AppConstant.API_CONFIG.API_URL.MEMBERS.GETMEMBER;
    this.SERVER_URL_INSERT_ADD_LOC = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTLOCATIONS;

    this.SERVER_URL_DEL_LOC = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.DELETELOCATIONS;
    this.SERVER_URL_GET_DOC = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETDOCUMENT;
    this.SERVER_URL_INSERT_ADD_DOC = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTDOCUMENT;
    this.SERVER_URL_DEL_DOC = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.DELETEDOCUMENT;

    this.SERVER_URL_ORG = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETORGANIZATION;

    this.SERVER_URL_GET_USER = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETUSER;
    this.SERVER_URL_GET_USER_BY_PAGE = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETUSERPAGE;
    this.SEREVER_URL_DELETE_USER =  this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.DELETEUSER;
    this.SEREVER_URL_SEARCH_USERS = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.GETUSERSEARCH;
    this.SERVER_URL_ORG_ADD = this.appendpoint + AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTORGANIZATION;

  }

  public getDesignations(): Observable<any> {
    return this.http.get(this.SERVER_URL_GET_DESG);
  }
  public addDesignation(f) {
    console.log(f);
    console.log(JSON.stringify(f));
    let body = JSON.stringify(f);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.SERVER_URL_INSERT_UPDATE_DESG, body, {
      headers: head
    });
  }
  public editDesignation(item: any): Promise<any> {
    console.log(item);
    return this.CommonHttpService.globalPostService(this.SERVER_URL_INSERT_UPDATE_DESG, item).then (
      data => {
        return data;
      }
    );
  }
  public deleteDesignation(designationID) {
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('how it is getting ID?:' + designationID);
    return this.http.post(this.SERVER_URL_DESG_DEL + designationID, {
      headers: head
    });
  }



  public getUsers() {
    return this.http.get(this.SERVER_URL_GET_USER);
  }

  public getUserBySearch(searchTerm) {
    return this.http.get(this.SEREVER_URL_SEARCH_USERS + searchTerm);
  }

  public getUserPage(page) {
    return this.http.get(this.SERVER_URL_GET_USER_BY_PAGE + page);
  }

  public uploadAndProgress(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    this.http.post('https://file.io', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

  public DeleteUser(id) {
    const head = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.SEREVER_URL_DELETE_USER + id, { Headers: head });
  }


// ------------- Dashboard -------------
  public getMember(): Observable<any> {
    console.log(this.http.get(this.SERVER_URL_GET_MEM));
    return this.http.get(this.SERVER_URL_GET_MEM);
  }
  //Leave Management
  public getCountry(){
  return  this.http.get('../../../assets/country.json');
  }
//HolidayList
public getHolidayList(){
  return this.http.get('../../../assets/holidaylist.json');
}
  // documents
  public getAllDocuments(): Observable<any> {
    return this.http.get(this.SERVER_URL_GET_DOC);
  }
  public addDocuments(f): Observable<any> {
    console.log(f);
    console.log(JSON.stringify(f));
    let body = JSON.stringify(f);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this.SERVER_URL_INSERT_ADD_DOC, body, {
      headers: head
    });
  }
  public deleteDocument(documentID) {
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('how it is getting ID?:' + documentID);
    return this.http.post(this.SERVER_URL_DEL_DOC + documentID, {
      headers: head
    });
  }

  public editDocument(item: any): Promise<any> {
    console.log(item);
    return this.CommonHttpService.globalPostService(
      this.SERVER_URL_INSERT_ADD_DOC,
      item
    ).then(data => {
      return data;
    });
  }

  // department
  public getDepartment(): Observable<any> {
    return this.http.get(this.SERVER_URL_GET_DEPT);
  }
  public addDepartment(f): Observable<any> {
  console.log(JSON.stringify(f));
      let body = JSON.stringify(f);
      let head = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this.SERVER_URL_INSERT_ADD_DEPT, body, {headers: head});
      }
  public editDepartment(item: any): Promise<any> {
      console.log(item);
      return this.CommonHttpService.globalPostService(this.SERVER_URL_INSERT_ADD_DEPT, item).then(data => {
      return data;
    });
    }
  public deleteDepartment(departmentID) {
      let head = new HttpHeaders().set('Content-Type', 'application/json');
      console.log('id deleted!!:' + departmentID);
      return this.http.post(this.SERVER_URL_DEPT_DEL + departmentID, { headers: head });
    }
//

// organisation
public getOrganization(): Observable<any>{
  return this.http.get(this.SERVER_URL_ORG);
  }
  public addOrganization(f) {
      console.log(f);
      console.log(JSON.stringify(f));
      let body = JSON.stringify(f);
      let head = new HttpHeaders().set('Content-Type', 'application/json');
       return this.http.post(this.SERVER_URL_ORG_ADD, body, { headers: head });
      }
    public editOrganization(item) {
      console.log(item);
      return this.CommonHttpService.globalPostService(this.SERVER_URL_ORG_ADD, item).then(data => {
      return data;
     });
   }

  // location
  public getLocations(): Observable<any> {
    return this.http.get(this.SERVER_URL_GET_LOC);
  }


  public addEditLocations(item) {
    console.log(JSON.stringify(item));
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set("Content-Type", "application/json");
    //added interceptors
    return this.http.post(this.SERVER_URL_INSERT_ADD_LOC, body, { headers: head });
  }
  // public editLocations(item: any): Promise<any> {
  //   console.log(item);

  //   return this.CommonHttpService.globalPostService(this.SERVER_URL_INSERT_ADD_LOC, item).then(data => {
  //     console.log(item);
  //     // return data;
  //   });
  // }

  public deleteLocations(LocationId) {
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('how it is getting ID?:' + LocationId);
    return this.http.post(this.SERVER_URL_DEL_LOC + LocationId, { headers: head });
  }
  //



}
