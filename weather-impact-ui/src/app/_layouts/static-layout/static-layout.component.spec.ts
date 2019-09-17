import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticLayoutComponent } from './static-layout.component';

describe('StaticLayoutComponent', () => {
  let component: StaticLayoutComponent;
  let fixture: ComponentFixture<StaticLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
