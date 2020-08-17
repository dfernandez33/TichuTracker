import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoundFormComponent } from './new-round-form.component';

describe('NewRoundFormComponent', () => {
  let component: NewRoundFormComponent;
  let fixture: ComponentFixture<NewRoundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
