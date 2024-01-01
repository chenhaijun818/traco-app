import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AffairComponent} from './affair.component';

describe('TrackPanelComponent', () => {
  let component: AffairComponent;
  let fixture: ComponentFixture<AffairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
