import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressaoDialogComponent } from './impressao-dialog.component';

describe('ImpressaoDialogComponent', () => {
  let component: ImpressaoDialogComponent;
  let fixture: ComponentFixture<ImpressaoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressaoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
