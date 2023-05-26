import { Component } from '@angular/core';
import { ExchangeDataService } from 'src/app/services/exchange-data.service';

@Component({
  selector: 'app-setting-rating',
  templateUrl: './setting-rating.component.html',
  styleUrls: ['./setting-rating.component.css']
})
export class SettingRatingComponent {

  countRatingClicks: number = 0;
  generalRating: number = 0;
  sumOfAllClickedValues: number = 0;

  constructor(private exDataService: ExchangeDataService){}

    /* RatingBoxes */
  
    /* Calculating value of rating */
    getRatingValue(ratingBoxID: string){
    
      this.countRatingClicks++;
      
      this.sumOfAllClickedValues = this.sumOfAllClickedValues + Number(ratingBoxID);
      this.generalRating = this.sumOfAllClickedValues / this.countRatingClicks;
          
      this.exDataService.assignValue(this.generalRating.toString());
      
    }
  
    /* Changing colors of blocks on :hover */
    getColored(ratingBox: HTMLDivElement){
          
      const allBox = document.getElementsByClassName('box-rating');
  
      [].filter.call(allBox, (box: HTMLDivElement)=>Number(box.id) <= Number(ratingBox.id))
      .map((box: HTMLDivElement)=> box.children[0].classList.toggle('new-colors'));
    }
  
    /* Return colors of blocks when mouse is out */
    switchOffColors(){
      const allBox = document.getElementsByClassName('box-rating');
  
      [...allBox as any].filter((box: HTMLDivElement)=> box.children[0].className.includes('new-colors'))
      .map((box: HTMLDivElement)=> box.children[0].classList.toggle('new-colors'));
    }
}
