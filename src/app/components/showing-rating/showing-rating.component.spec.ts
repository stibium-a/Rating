import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingRatingComponent } from './showing-rating.component';
import { ExchangeDataService } from 'src/app/services/exchange-data.service';
import { Subject } from 'rxjs';

describe('ShowingRatingComponent', () => {
  let component: ShowingRatingComponent;
  let fixture: ComponentFixture<ShowingRatingComponent>;
  let stub: Partial<ExchangeDataService>;
  let service: ExchangeDataService;
    
  beforeEach(async () => {
    
    const fakeSubject = new Subject<string>();

    stub = {
      assignValue(str:any){
        
        fakeSubject.next(str);
      },
      value$: fakeSubject.asObservable()
    }

    await TestBed.configureTestingModule({
    
        declarations: [ ShowingRatingComponent ],
        providers:[
          { provide: ExchangeDataService, 
            useValue: stub
          }
        ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(ExchangeDataService);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should choose a className redBackground', () => {
    component.generalRating = 1.5;
    expect(component.setBackgroundForBlocks()).toBe('redBackground');
  });

  it('should choose a className yellowBackground', () => {
    component.generalRating = 3;
    expect(component.setBackgroundForBlocks()).toBe('yellowBackground');
  });

  it('should choose a className greenBackground', () => {
    component.generalRating = 4.5;
    expect(component.setBackgroundForBlocks()).toBe('greenBackground');
  });

  it('setRating should assign value 3.5 to generalRating', () => {
    component.setRating('3.5');
    expect(component.generalRating).toBe(3.5);
  });

  it('setRating should assign value 4 to generalRating', () => {
    component.setRating('4');
    expect(component.generalRating).toBe(4);
  });
  
  it('should working service and pass correct parametr', (done: DoneFn) => {
    
    service.value$.subscribe((res)=>{
      expect(res).toBe('2.84');
      component.ngOnInit();
      component.setRating(res);
      expect(component.generalRating).toBe(2.84);
      done();
    })
    
    service.assignValue('2.84');
    
  });

});
  