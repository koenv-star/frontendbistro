import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reservatie } from 'src/app/models/reservatie';
import { Zaak } from 'src/app/models/zaak';
import { ReservatieService } from 'src/app/services/reservatie.service';
import { ZaakService } from 'src/app/services/zaak.service';
import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import resourceTimelinePlugin, {
  ResourceTimelineLane,
} from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Dag } from 'src/app/models/dag';

let eventGuid = 0;

@Component({
  selector: 'app-reservaties',
  templateUrl: './reservaties.component.html',
  styleUrls: ['./reservaties.component.css'],
})
export class ReservatiesComponent implements OnInit {
  reservaties: Reservatie[];
  zaak: Zaak;
  reservatieForm: FormGroup;
  tafels: Map<number, number>;
  dagen: Dag[];
  calendarOptions: CalendarOptions;

  events = [];
  calendarVisible:boolean= true;
  currentEvents: EventApi[];
  nonworkingdays: any[];
  constructor(
    private route: ActivatedRoute,
    private reservatiesservice: ReservatieService,
    private zaakService: ZaakService
  ) {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.getZaak();
    this.reservatieForm = new FormGroup({
      datum: new FormControl('', Validators.required),
      personen: new FormControl('', [
        Validators.pattern('[0-9]{1,3}'),
        Validators.required,
      ]),
    });
  }

  createEventId() {
    return String(eventGuid++);
  }

  getZaak() {
    this.zaakService
      .getZaak(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((data) => {
        this.zaak = data;
        this.dagen = data.openingsUren.dagen;
        this.reservaties = data.reservaties;
        this.aantaltafelsmetzelfdeaantalstoelen();
        this.calendarOptions = {
          plugins: [
            dayGridPlugin,
            resourceTimelinePlugin,
            resourceTimeGridPlugin,
            bootstrapPlugin,
          ],
          themeSystem: 'bootstrap',
          allDaySlot:false,
          height: "auto",
          businessHours: this.defineOpeningsTijd(),
          timeZone: 'UTC',
          initialView: 'resourceTimeGridDay',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          slotMinTime: '10:00:00',
          slotMaxTime: '23:00:00',
          resourceAreaHeaderContent: 'Tafels',
          resources: this.defineResource(),
          initialEvents: this.defineEvents(),
          weekends: true,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          select: this.handleDateSelect.bind(this),
          eventClick: this.handleEventClick.bind(this),
          eventsSet: this.handleEvents.bind(this),
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right:
              'resourceTimeGridDay,resourceTimeGridWeek,resourceTimelineMonth',
          },
        };
      });
  }

  aantaltafelsmetzelfdeaantalstoelen() {
    const tafels = new Map<number, number>();
    for (let tafel of this.tafelslijst) {
      let x = 1;
      if (tafels.has(tafel.stoelen)) {
        x = tafels.get(tafel.stoelen) + 1;
      }

      tafels.set(tafel.stoelen, x);
    }

    this.tafels = tafels;
  }

  // Makes a resource array with an Id and Title for the fullcalendar.
  // tafels are the resources in this case.
  defineResource() {
    let index = 1;
    const resources = [];
    for (let tafel of this.tafelslijst) {
      resources.push({
        id: `${tafel.id}`,
        title: `Tafel${index}: (${tafel.stoelen} stoelen)`,
      });

      index++;
    }

    return resources;
  }

  defineEvents() {
    const events = [];

    for (let reservatie of this.reservaties) {
      // const endDate=  new Date(reservatie.tijdstip.getFullYear(),reservatie.tijdstip.getMonth(),reservatie.tijdstip.getHours(),reservatie.tijdstip.getMinutes(), 0,0);
      const endDate = new Date(
        reservatie.tijdstip.valueOf() +
          reservatie.uurMarge.hours * 60 * 60 * 1000 +
          reservatie.uurMarge.minutes * 60 * 1000
      );
      events.push({
        title: 'Booked',
        start: `${reservatie.tijdstip}`,
        end: endDate,
        resourceId: `${reservatie.tafel.id}`,
      });
    }

    return events;
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }



  defineOpeningsTijd() {
    const days = [];
    this.nonworkingdays=[];

    for (let dag of this.dagen) {
      console.log(dag.naam);
      console.log(dag.openingsUur);
      console.log(dag.sluitingsUur);
      switch (dag.naam) {
        case 'Maandag': case 'Ma': {
          days.push({
            daysOfWeek: [1],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Dinsdag': case 'Di': {
          days.push({
            daysOfWeek: [2],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Woensdag': case 'Wo': {
          days.push({
            daysOfWeek: [3],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Donderdag':case 'Do': {
          days.push({
            daysOfWeek: [4],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Vrijdag':case 'Vrij': {
          days.push({
            daysOfWeek: [5],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Zaterdag':case 'Zat': {
          days.push({
            daysOfWeek: [6],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Zondag':case 'Zo': {
          days.push({
            daysOfWeek: [0],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });

          console.log(days);
          break;
        }
      }
    }
    return days;
  }

  get personen() {
    return this.reservatieForm.get('personen');
  }

  get datum() {
    return this.reservatieForm.get('datum');
  }

  get zaaknaam() {
    return this.zaak && this.zaak.naam ? this.zaak.naam : null;
  }

  get zaakObject() {
    return this.zaak ? this.zaak : null;
  }

  get tafelslijst() {
    return this.zaak && this.zaak.tafels ? this.zaak.tafels : null;
  }
}
