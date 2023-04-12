import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/public/welcome/models/user.model';

@Injectable({
providedIn: 'root',
})

export class UserService {
    private userUrl:string = "http://localhost:5000/api/user/get/"
    constructor(private http: HttpClient) {}

    getUserData(userId: string): Observable<UserInterface> {
        console.log('Id send:')
        console.log(userId)
        console.log('Url send:')
        console.log(`${this.userUrl}${userId}`)
        return this.http.get<UserInterface>(`${this.userUrl}`+ JSON.parse(userId));
    }

}
