import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInterface } from "../models/user.model";

@Injectable({
    providedIn:"root"
})

export class RegisterService{
    private registerUrl:string = "http://localhost:5000/api/user/add"
    constructor(private http:HttpClient){}

    register(username : string, password : string, fullname: string, email: string) : Observable<UserInterface>{
        const body = {
            username : username,
            password : password,
            fullname : fullname,
            email : email,
            balance : 10000
        }
        return this.http.post<UserInterface>(this.registerUrl, body);
    }

    
}