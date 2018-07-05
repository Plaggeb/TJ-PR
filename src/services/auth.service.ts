import { Injectable } from "@angular/core";
import { Headers, RequestOptions, Http, RequestMethod, Request } from "@angular/http";
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

export class User {
    name: string;
    userid: string;

    constructor (name: string, userid: string) {
        this.name = name;
        this.userid = userid;
    }
}

@Injectable()
export class AuthService {
    currentUser: User;
    headers: Headers;
    options: RequestOptions;
    token: string;
    userid: string;
    roles: any;

    private AUTH_URL = 'https://api.towerjazz.com/auth';

    constructor (public http: Http) { }

    public login(credentials) {
        if (credentials.userid === null || credentials.password === null) {
            return Observable.throw("Please enter credentials");
        } else {
            return Observable.create(observer => {
                console.log('User: ' + credentials.userid + ', Pass: ' + credentials.password);
                this.headers = new Headers();
                this.headers.append('Accept', 'application/json');
                this.headers.append('Authorization', 'Basic ' + btoa(credentials.userid + ":" + credentials.password));

                //using IONIC Proxy to get around CORS issue with Chrome
                this.options = new RequestOptions({
                    method: RequestMethod.Get,
                    url: this.AUTH_URL,
                    headers: this.headers
                });
                //this.http.get("/auth", this.options)
                this.http.request(new Request(this.options))
                .timeout(15000)         //15 second timeout
                .map(response => response.json())
                .subscribe(
                    data => this.authSuccess(observer, data, credentials.userid),
                    err => this.authFail(observer, err)
                );
            });
        }
    }

    authSuccess(observer, data, user) {
        console.log('OK: ' + JSON.stringify(data));
        try {
            this.token = data.body.token;
            this.userid = user;
            observer.next(true);
        }
        catch (err) {
            observer.next(false);
        }

        observer.complete();
    }

    authFail(observer, err) {
        console.log('ERR: ' + JSON.stringify(err));
        observer.next(false);
        observer.complete();
    }

    public getUserInfo(): User {
        return this.currentUser;
    }
    
    public setToken(token) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }

    public setUserid(user) {
        this.userid = user;
    }

    public getUserid() {
        return this.userid;
    }

    public hasToken() {
        if ((this.token !== undefined) && (this.token != null)) {
            return true;
        } else {
            return false;
        }
    }

    public setRoles(roles) {
        this.roles = roles;
    }

    public getRoles() {
        return this.roles;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }
}