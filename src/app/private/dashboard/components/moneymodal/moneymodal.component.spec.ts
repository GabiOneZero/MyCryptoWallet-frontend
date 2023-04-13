import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneymodalComponent } from './moneymodal.component';

describe('MoneymodalComponent', () => {
  let component: MoneymodalComponent;
  let fixture: ComponentFixture<MoneymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneymodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
