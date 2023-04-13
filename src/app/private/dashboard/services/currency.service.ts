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

    getAllCurrencies(): Observable<CurrencyInterface[]> {
        return this.http.get<CurrencyInterface[]>(`${this.currencyUrl}get/all/`);
    }

    getCurrencyById(currencyId: string): Observable<CurrencyInterface> {
        console.log('Id send:')
        console.log(currencyId)
        console.log('Url send:')
        console.log(`${this.currencyUrl}get/` + currencyId)
        return this.http.get<CurrencyInterface>(`${this.currencyUrl}get/` + currencyId);
    }

}
