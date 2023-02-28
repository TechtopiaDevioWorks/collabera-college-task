import { Component, Input, OnInit } from '@angular/core';
import { College } from '@core/interfaces/college';

@Component({
  selector: 'app-college-card',
  templateUrl: './college-card.component.html',
  styleUrls: ['./college-card.component.scss']
})
export class CollegeCardComponent implements OnInit{
  @Input() college: College | null = null;
  imgUrl = 'https://bulma.io/images/placeholders/1280x960.png';

  imgOptions = [
    "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1280&h=960&dpr=1",
    "https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg?auto=compress&cs=tinysrgb&w=1280&h=960&dpr=1",
    "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=1280&h=960&dpr=1",
    "https://images.pexels.com/photos/396304/pexels-photo-396304.jpeg?auto=compress&cs=tinysrgb&w=1280&h=960&dpr=1",
    "https://images.pexels.com/photos/798721/pexels-photo-798721.jpeg?auto=compress&cs=tinysrgb&w=1280&h=960&dpr=1",
    "https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=1280&h=960&dpr=1"
  ]
  constructor() {

  }
  ngOnInit(): void {
    this.imgUrl = this.imgOptions[this.getRandomInt(0, this.imgOptions.length-1)]
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
