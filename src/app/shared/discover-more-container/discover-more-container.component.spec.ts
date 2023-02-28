import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMoreContainerComponent } from './discover-more-container.component';

describe('DiscoverMoreContainerComponent', () => {
  let component: DiscoverMoreContainerComponent;
  let fixture: ComponentFixture<DiscoverMoreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverMoreContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverMoreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
