import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
	declarations: [LayoutComponent],
	imports: [CommonModule, FooterModule, HeaderModule, CoreModule],
	exports: [LayoutComponent],
})
export class LayoutModule {}
