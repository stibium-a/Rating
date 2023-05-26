import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { ExchangeDataService } from 'src/app/services/exchange-data.service';

@Component({
  selector: 'app-showing-rating',
  templateUrl: './showing-rating.component.html',
  styleUrls: ['./showing-rating.component.css']
})
export class ShowingRatingComponent implements OnInit, OnDestroy {

  generalRating: number = 0;
  isAlive: boolean = true;
  
  constructor(private exchangeDataService: ExchangeDataService){}

  ngOnInit(): void {
    /* Receiving value of rating */
    this.getDataFromService();
    
  }

  getDataFromService(){
    this.exchangeDataService.value$
    .pipe(takeWhile(()=> this.isAlive))
    .subscribe(value => this.setRating(value));
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
  
  /* Fill blocks by color */
  setRating(ratingInputValue: string){

    this.generalRating = +ratingInputValue;
    let numberOfFullColoredBlocks: number = parseInt(ratingInputValue);
    let percentOfPartColoringBlock: number = this.generalRating - numberOfFullColoredBlocks;
    
    const allBlocksFilledByColor = document.getElementsByClassName("color-box");

    [].map.call(allBlocksFilledByColor, ((block: HTMLDivElement) => block.style.width = '0'));

    if(percentOfPartColoringBlock !== 0){

      [].filter.call(allBlocksFilledByColor, (block: HTMLDivElement) => 
        Number(block.id) <= numberOfFullColoredBlocks + 1)
        .map((block: HTMLDivElement) => {
        +block.id <= numberOfFullColoredBlocks ? 
        (block.style.width = '100%', 
         block.style.transition = 'all 1s ease') : 
        (block.style.width = percentOfPartColoringBlock*100 + '%', 
         block.style.transition = 'all 1s ease');
      });
        
    } else {

      [].filter.call(allBlocksFilledByColor, (block: HTMLDivElement) =>
        +block.id <= numberOfFullColoredBlocks)
      .map((block: HTMLDivElement) => (block.style.width = '100%', block.style.transition = 'all 1s ease'));
    }

    this.setBackgroundForBlocks();
  }

  /* Defining color for blocks depending on the rating value */
  setBackgroundForBlocks():string{
    
    let color: string = '';

    if(this.generalRating <= 2) { 
      color = 'redBackground';
    }
    else if(this.generalRating > 2 && this.generalRating < 4) {
      color = 'yellowBackground'; 
    }
    else{
      color = 'greenBackground'; 
    }
    return color;
  }
}
