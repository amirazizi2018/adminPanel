import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDetail } from './meeting-detail';

describe('MeetingDetail', () => {
  let component: MeetingDetail;
  let fixture: ComponentFixture<MeetingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
