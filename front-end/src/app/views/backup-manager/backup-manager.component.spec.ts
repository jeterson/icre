import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupManagerComponent } from './backup-manager.component';

describe('BackupManagerComponent', () => {
  let component: BackupManagerComponent;
  let fixture: ComponentFixture<BackupManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
