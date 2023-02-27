import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCollegeFilterComponent } from './dashboard-college-filter.component';

describe('DashboardCollegeFilterComponent', () => {
  let component: DashboardCollegeFilterComponent;
  let fixture: ComponentFixture<DashboardCollegeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCollegeFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCollegeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
