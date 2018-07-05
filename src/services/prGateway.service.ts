import { Injectable } from "@angular/core";
import { Http, Headers, Response, HttpModule, RequestOptions, Jsonp } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { IRequisition } from "../interfaces/requisition.interface";
import { AlertController } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequiredValidator } from "@angular/forms";
import { IAPIInterface } from "../interfaces/api.interface";
import { AuthService } from "./auth.service";

@Injectable()
export class PRGatewayService {
    private headers: Headers = new Headers();
    private options: RequestOptions;
    private usr: string;
    private pwd: string;
    private relGroups = ["01", "JP", "US", "SA"];
    
    //Use this when publish to device
    private BASE_URL: string = 'https://api.towerjazz.com/fab3/rs';  //?rmt=/sap/tx
    
    //Use proxy when testing website
    //private BASE_URL: string = '/rs'
    
    private api: IAPIInterface = new IAPIInterface;

    constructor(private http: Http, private alertCtrl: AlertController, private httpClient: HttpClient, 
        private jsonp: Jsonp,
        private authService: AuthService ) {
    }

    public getRelGroups() { return this.relGroups; }
    public getUser(): string { return this.usr; }
    public getPwd(): string { return this.pwd; }

    setCredentials(usr: string, pwd: string) {
        this.usr = usr;
        this.pwd = pwd;
        console.log('User: ' + this.usr + ', Pwd: ' + this.pwd);
       
        //Remove after testing
        // this.usr = "plaggeb";
        // this.pwd = "Kenzie13";

        //  Set the headers
        this.headers.set("Authorization", this.authService.getToken());
        this.headers.set("Content-Type", "application/json");
        this.options = new RequestOptions({headers: this.headers});

        //  Set some of the API stuff that won't change
        this.api.user = this.usr;
        this.api.pass = this.pwd;
        this.api.method = 'get';
        this.api.payload = '';

    }
    
    clearCredentials() {
        this.usr = '';
        this.pwd = '';
        this.headers.delete('Authorization');
    }


    checkSAPCredentialsAPI() {
        this.api.relUrl = '/TVKO_SINGLE_READ?VKORG=0009&sap-client=400&format=json';
        
        let body: string = JSON.stringify(this.api);

        return this.http.post(this.BASE_URL + '?rmt=/sap/tx', body, {headers: this.headers})
            .timeout(30000)
            .map((response: Response) => {
                return response.json();
            });
    }

    releaseItemAPI(pr: string, lineItem: string, releaseCode: string) {
        this.api.relUrl = '/BAPI_REQUISITION_RELEASE?sap-client=400&NUMBER=' + pr + '&REL_CODE=' + releaseCode + '&ITEM=' + lineItem +'&format=json';
        let body: string = JSON.stringify(this.api);

        return this.http.post(this.BASE_URL + '?rmt=/sap/tx', body, {headers: this.headers})
            .timeout(30000)
            .map((response: Response) => {
                return response.json();
            });
    }

    getReleaseItemsAPI(group: string, code: string) {
        this.api.relUrl = '/BAPI_REQUISITION_GETITEMSREL?sap-client=400&REL_GROUP=' + group + '&REL_CODE=' + code + '&format=json'
        let body: string = JSON.stringify(this.api);

        return this.http.post(this.BASE_URL + '?rmt=/sap/tx', body, {headers: this.headers})
            .timeout(30000)
            .map((response: Response) => {
                    return response.json();
                });
    }

    getRequisitionItemsAPI(plant: string) {
        this.api.relUrl = '/BAPI_REQUISITION_GETITEMS?sap-client=400&PLANT=' + plant + '&format=json';
        let body: string = JSON.stringify(this.api);
        
        // Need to change method to receive some params and then set them in the URL
        return this.http.post(this.BASE_URL + '?rmt=/sap/tx', body, {headers: this.headers} )
            .timeout(30000)    
            .map((response: Response) => {
                    return response.json();
                });
    }

    getRequisitionAPI(number: string) {
        this.api.relUrl = '/BAPI_REQUISITION_GETDETAIL?sap-client=400&NUMBER=' + number + '&format=json';
        let body: string = JSON.stringify(this.api);
        
        return this.http.post(this.BASE_URL + '/rmt=/sap/tx', body, {headers: this.headers} )
            .timeout(30000)
            .map((response: Response) => {
                    return response.json();
                });
    }

    getRequisitionExpandedAPI(number: string) {
        this.api.relUrl = '/BAPI_PR_GETDETAIL?sap-client=400&NUMBER=' + number + '&ACCOUNT_ASSIGNMENT=X&ITEM_TEXT=X&HEADER_TEXT=X&format=json';
        let body: string = JSON.stringify(this.api);

        return this.http.post(this.BASE_URL + '?rmt=/sap/tx', body, {headers: this.headers})
            .timeout(30000)
            .map((response: Response) => {
                    return response.json();
                });
    }



    //  Old code for directly talking to SAP,  CORS issues
    checkSAPCredentials() {
        let url: string = 'http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/TVKO_SINGLE_READ?VKORG=0009&sap-client=400&format=json';
        return this.http.get(url, {headers: this.headers})
        .map((response: Response) => {
            return response.json();
        });
    }

    releaseItem(pr: string, lineItem: string, releaseCode: string): Observable<IRequisition> {
        let url: string = 'http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_RELEASE?sap-client=400&NUMBER=' + pr + '&REL_CODE=' + releaseCode + '&ITEM=' + lineItem +'&format=json';
        return this.http.get(url, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            });
    }

    releaseItemProxy(pr: string, lineItem: string, releaseCode: string): Observable<IRequisition> {
        let url: string = '?sap-client=400&NUMBER=' + pr + '&REL_CODE=' + releaseCode + '&ITEM=' + lineItem +'&format=json';
        return this.http.get('/BAPI_REQUISITION_RELEASE' + url, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            });
    }

    releaseItemJSONP(pr: string, lineItem: string, releaseCode: string): Observable<IRequisition> {
        let url: string = 'http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_RELEASE?sap-client=400&NUMBER=' + pr + '&REL_CODE=' + releaseCode + '&ITEM=' + lineItem +'&callback=JSONP_CALLBACK';

        return this.jsonp.request(url, {method: 'Get', headers: this.headers})
        .map (
            (response: Response) => {
                return response.json();
            }
        );
    }

    getRequisitionItems(plant: string) {

        // Need to change method to receive some params and then set them in the URL
        return this.http.get('http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_GETITEMS?sap-client=400&PLANT=' + plant + '&format=json', {headers: this.headers} )
            .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getRequisitionItemsJSONP(plant: string) {
        // Need to change method to receive some params and then set them in the URL
        let url: string = 'http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_GETITEMS?sap-client=400&PLANT=' + plant + '&callback=JSONP_CALLBACK';

        return this.jsonp.request(url, {method: 'Get', headers: this.headers})
        .map (
            (response: Response) => {
                return response.json();
            }
        );
    }
    

    getRequisition(number: string) {
        return this.http.get('http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_GETDETAIL?sap-client=400&NUMBER=' + number + '&format=json', {headers: this.headers} )
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getRequisitionProxy(number: string) {
        let url: string = '?sap-client=400&NUMBER=' + number + '&format=json';
        return this.http.get('/BAPI_REQUISITION_GETDETAIL' + url, {headers: this.headers} )
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getRequisitionJSONP(number: string) {
        let url: string = 'http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_GETDETAIL?sap-client=400&NUMBER=' + number + '&callback=JSONP_CALLBACK';
        return this.jsonp.request(url, {method: 'Get', headers: this.headers})
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getReleaseItems(group: string, code: string) {
        return this.http.get('http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_GETITEMSREL?sap-client=400&REL_GROUP=' + group + '&REL_CODE=' + code + '&format=json', {headers: this.headers} )
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }

    getReleaseItemsProxy(group: string, code: string) {
        
        let url: string = '?sap-client=400&REL_GROUP=' + group + '&REL_CODE=' + code + '&format=json';
        return this.http.get('/BAPI_REQUISITION_GETITEMSREL' + url, {headers: this.headers} )
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }

    getReleaseItemsJSONP(group: string, code: string) {
        let url: string = 'http://mhvmsapsnx.saphere.corp.towersemi.com:8000/sap/bc/rest/restjson/BAPI_REQUISITION_GETITEMSREL?sap-client=400&REL_GROUP=' + group + '&REL_CODE=' + code + '&format=jsonp&callback=JSONP_CALLBACK';

        return this.jsonp.get(url, {headers: this.headers})
        .map (
            (response: Response) => {
                console.log(response);
                return response.json();
            })
        .catch(
            (error: any) => {
                return Observable.throw(error);
            }
        );
    }


}