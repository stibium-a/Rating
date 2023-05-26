import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRatingComponent } from './setting-rating.component';

describe('SettingRatingComponent', () => {
  let component: SettingRatingComponent;
  let fixture: ComponentFixture<SettingRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template should have 5 div class box-rating', () => {
    const element: HTMLElement = fixture.nativeElement;
    const blocks = element.getElementsByClassName('box-rating');
    expect([...blocks as any].length).toBe(5);
  });

  it('function getColored should assign class "new-colors" for 3 elements', () => {
    const div: HTMLElement = fixture.nativeElement;
    const blocks = div.getElementsByClassName('box-rating');
        
    const oneBLock = [...blocks as any].find((item)=> item.id == '3');
    
    component.getColored(oneBLock);

    const assignedClassBlocks =  [...blocks as any].filter((item)=> item.children[0].className.includes('new-colors'));

    expect(assignedClassBlocks.length).toBe(3);
  });

  it('function switchOffColors should remove class "new-colors" for elements', () => {
    const div: HTMLElement = fixture.nativeElement;
    const blocks = div.getElementsByClassName('box-rating');

    [...blocks as any].forEach((item)=> item.children[0].classList.add('new-colors'));
   
    component.switchOffColors();

    expect([...blocks as any].some((item)=>item.children[0].className.includes('new-colors'))).toBeFalse();
  });

  it('should calculate', () => {
    const sumOfAllClickedValues = 10;
    const countRatingClicks = 2;
    component.getRatingValue('5');
    expect(component.generalRating).toEqual(5);
  });
});
