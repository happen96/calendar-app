import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import * as range from 'lodash.range';
import {
  DAY_NUMBER, DAYS_FORMAT_DATE,
  DEFAULT_FORMAT_DATE, MONTHS_FORMAT_DATE,
  NAME_OF_DAYS,
  SINGLE_DAY, SINGLE_MONTH,
  UNIT_FORMAT_DAYS,
  UNIT_FORMAT_MONTHS, YEARS_FORMAT_DATE
} from '../../../constants/calendar-mock';
import { FormModalService } from '../../form-modal/form-modal.service';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-daily-section',
  templateUrl: './daily-section.component.html',
  styleUrls: ['./daily-section.component.scss']
})

export class DailySectionComponent implements OnInit {

  currentDate: moment.Moment;
  namesOfDays = NAME_OF_DAYS;
  yearsFormat = YEARS_FORMAT_DATE;
  monthsFormat = MONTHS_FORMAT_DATE;
  weeks: Array<CalendarDate[]> = [];
  currentMonth = '';

  selectedDate;
  show: boolean;

  @ViewChild('calendar', {static: true}) calendar;

  @HostListener('document:click', ['$event'])
  clickOut(event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  constructor(
    private eRef: ElementRef,
    private modalService: FormModalService
  ) { }

  ngOnInit(): void {
    this.currentDate = moment();
    this.selectedDate = moment(this.currentDate).format(DEFAULT_FORMAT_DATE);
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private fillDates(currentMoment: moment.Moment): any {
    const firstOfMonth = moment(currentMoment).startOf(SINGLE_MONTH).day();
    const lastOfMonth = moment(currentMoment).endOf(SINGLE_MONTH).day();

    const firstDayOfGrid = moment(currentMoment).startOf(SINGLE_MONTH).subtract(firstOfMonth, UNIT_FORMAT_DAYS);
    const lastDayOfGrid = moment(currentMoment).endOf(SINGLE_MONTH).subtract(lastOfMonth, UNIT_FORMAT_DAYS).add(7, UNIT_FORMAT_DAYS);

    const startCalendar = firstDayOfGrid.date();

    return range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, UNIT_FORMAT_DAYS)).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, UNIT_FORMAT_MONTHS);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, UNIT_FORMAT_MONTHS);
    this.generateCalendar();
  }

  isDisabledMonth(currentDate): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, UNIT_FORMAT_MONTHS);
  }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), SINGLE_DAY);
  }

  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format(DEFAULT_FORMAT_DATE);
  }

  isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.currentDate, SINGLE_MONTH) && moment(date).isSameOrBefore(today);
  }

  selectDate(date: CalendarDate): void {
    this.selectedDate = moment(date.mDate).format(DEFAULT_FORMAT_DATE);

    this.generateCalendar();
    this.show = !this.show;
  }

  openModal(id: string, date): void {
    this.currentMonth = date.format(MONTHS_FORMAT_DATE);
    this.selectedDate = `${date.date()}${this.getSuffix(date.date())} ${date.day(date.format(DAY_NUMBER)).format(DAYS_FORMAT_DATE)}`;
    this.modalService.open(id);
  }

  getSuffix(num): string {
    if (num === 1) {
      return 'st';
    } else if (num === 2) {
      return 'nd';
    } else if (num === 3) {
      return 'rd';
    } else {
      return 'th';
    }
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
