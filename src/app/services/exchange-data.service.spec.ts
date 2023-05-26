import { TestBed } from '@angular/core/testing';
import { ExchangeDataService } from './exchange-data.service';

describe('ExchangeDataService', () => {
  let service: ExchangeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('function assignValue should assign value', (done: DoneFn) => {
      
      service.value$.subscribe((str:any) => {
        expect(str).toBe('test');
        done();
      })
      service.assignValue('test');
  });

 });
