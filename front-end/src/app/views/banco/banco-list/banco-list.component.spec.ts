import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoListComponent } from './banco-list.component';

describe('BancoListComponent', () => {
  let component: BancoListComponent;
  let fixture: ComponentFixture<BancoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
