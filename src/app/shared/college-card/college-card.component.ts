import { Component, Input } from '@angular/core';
import { College } from '@core/interfaces/college';

@Component({
  selector: 'app-college-card',
  templateUrl: './college-card.component.html',
  styleUrls: ['./college-card.component.scss']
})
export class CollegeCardComponent {
  @Input() college: College | null = null;
}
