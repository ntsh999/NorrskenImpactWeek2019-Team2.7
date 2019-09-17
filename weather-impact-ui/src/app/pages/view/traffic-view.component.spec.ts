import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NscGlobalViewComponent } from './nsc-global-view.component';

describe('NscGlobalViewComponent', () => {
  let component: NscGlobalViewComponent;
  let fixture: ComponentFixture<NscGlobalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NscGlobalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NscGlobalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
