import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsConfigComponent } from './models-config.component';

describe('ModelsConfigComponent', () => {
  let component: ModelsConfigComponent;
  let fixture: ComponentFixture<ModelsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
