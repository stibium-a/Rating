import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {

  private _value = new Subject<string>();
  value$ = this._value.asObservable();

  constructor() { }

  assignValue(parametr: string){
    
    this._value.next(parametr); 
  }
}
