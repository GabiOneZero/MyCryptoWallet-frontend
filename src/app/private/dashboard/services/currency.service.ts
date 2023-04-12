import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyInterface } from '../models/currency.model';

@Injectable({
providedIn: 'root',
})

export class CurrencyService {
    private currencyUrl:string = "http://localhost:5000/api/currency/"
    constructor(private http: HttpClient) {}

    // addCurrency(rating: number, text: string): Observable<number> {
    //     const body = {
    //     rating: rating,
    //     text: text,
    //     };
    //     // TO-DO: tratar el error 500
    //     return this.http.post<number>(this.currencyUrl, body);
    // }
    // addImgCurrency(): Observable<number> {
    //     const body = {
    //     };
    //     // TO-DO: tratar el error 500
    //     return this.http.post<number>(this.currencyUrl, body);
    // }

    getAllCurrencies(): Observable<CurrencyInterface[]> {

        return this.http.get<CurrencyInterface[]>(`${this.currencyUrl}get/all/`);
    }

}
