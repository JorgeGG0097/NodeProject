import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsGoalsComponent } from './highcharts-goals.component';

describe('HighchartsGoalsComponent', () => {
  let component: HighchartsGoalsComponent;
  let fixture: ComponentFixture<HighchartsGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartsGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighchartsGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
