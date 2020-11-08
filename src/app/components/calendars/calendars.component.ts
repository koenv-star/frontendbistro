import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
// document.addEventListener('DOMContentLoaded', function () {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new Calendar(calendarEl, {});

//   calendar.render();
// });

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css'],
})
export class CalendarsComponent implements OnInit {
  constructor() {
    const name = Calendar.name;
  }

  ngOnInit(): void {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, resourceTimelinePlugin, resourceTimeGridPlugin, bootstrapPlugin],
    themeSystem: 'bootstrap',
    timeZone: 'UTC',
    initialView: 'resourceTimelineDay',
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    aspectRatio: 3,
    slotMinTime: "10:00:00",
    slotMaxTime: "23:00:00",
    resourceAreaHeaderContent: 'Tafels',
    resources: [
      { id: 'a', title: 'Tafel 1' },
      { id: 'b', title: 'Tafel 2' },
      { id: 'c', title: 'Tafel 3' },
      { id: 'd', title: 'Tafel 4' },
    ],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
    },
  };
}
