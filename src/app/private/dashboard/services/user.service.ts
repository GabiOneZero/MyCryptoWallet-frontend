import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/public/welcome/models/user.model';
import { WalletInterface } from '../models/wallet.model';

@Injectable({
providedIn: 'root',
})

export class UserService {
    private getUrl:string = "http://localhost:5000/api/user/get/"
    private updateWalletUrl:string = "http://localhost:5000/api/user/update/wallet"
    private updateUserUrl:string = "http://localhost:5000/api/user/update"

    constructor(private http: HttpClient) {}

    getUserData(userId: string): Observable<UserInterface> {
        console.log('Id send:')
        console.log(userId)
        console.log('Url send:')
        console.log(`${this.getUrl}${userId}`)
        return this.http.get<UserInterface>(`${this.getUrl}`+ JSON.parse(userId));
    }

    getWalletByIds(userId: any, currencyId: string): Observable<WalletInterface> {
        console.log('Id send:')
        console.log(userId)
        console.log(currencyId)
        console.log('Url send:')
        console.log(`${this.getUrl}wallet/`+ JSON.parse(userId) + '/' + currencyId)
        return this.http.get<WalletInterface>(`${this.getUrl}wallet/`+ JSON.parse(userId) +'/'+ currencyId);
    }

    updateWallet(currencyId: string, userId: any, quantity: number) : Observable<WalletInterface>{
        console.log('Info send:')
        console.log(userId)
        console.log(currencyId)
        console.log(quantity)
        console.log("URL send:")
        
        const body = {
            currencyId : currencyId,
            userId: JSON.parse(userId),
            amount: quantity
        }   
        console.log(this.updateWalletUrl, body)     
        return this.http.put<WalletInterface>(this.updateWalletUrl, body);
    }

    updateUser(userId: any, username: any, fullname: any, password: any, email: any, balance: any) : Observable<UserInterface>{
        console.log('Info send:')
        console.log(userId)
        console.log(username)
        console.log(fullname)
        console.log(password)
        console.log("URL send:")
        
        const body = {
            userId: JSON.parse(userId),
            username : JSON.parse(username),
            fullname : JSON.parse(fullname),
            password : JSON.parse(password),
            email : JSON.parse(email),
            balance : balance
        }   
        console.log(this.updateUserUrl, body)     
        return this.http.put<UserInterface>(this.updateUserUrl, body);
    }

}
