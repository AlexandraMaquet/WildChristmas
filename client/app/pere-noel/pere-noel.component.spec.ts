import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PereNoelComponent } from './pere-noel.component';

describe('PereNoelComponent', () => {
  let component: PereNoelComponent;
  let fixture: ComponentFixture<PereNoelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PereNoelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PereNoelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
