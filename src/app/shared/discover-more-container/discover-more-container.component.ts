import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
	selector: 'app-discover-more-container',
	templateUrl: './discover-more-container.component.html',
	styleUrls: ['./discover-more-container.component.scss'],
})
export class DiscoverMoreContainerComponent {
	@Input() textLocation: 'right' | 'left' | 'middle' | 'middle-overlay'= 'right';
	@Input() overheading: string | undefined;
	@Input() heading: string | undefined;
	@Input() subheading: string | undefined;
	@Input() description: string | undefined;
	@Input() buttonRoute: string | undefined;
	@Input() textColor: string = 'antiquewhite';
	@Input() imgUrl: string | undefined;
}
