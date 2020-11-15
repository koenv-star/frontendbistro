import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reservatie } from 'src/app/models/reservatie';
import { Zaak } from 'src/app/models/zaak';
import { ReservatieService } from 'src/app/services/reservatie.service';
import { ZaakService } from 'src/app/services/zaak.service';
import {
  Calendar,
  CalendarApi,
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
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Reservatieresponse } from 'src/app/models/reservatieresponse';
import { OpeningsUren } from 'src/app/models/openings-uren';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-reservaties',
  templateUrl: './reservaties.component.html',
  styleUrls: ['./reservaties.component.css'],
})
export class ReservatiesComponent implements OnInit {
  reservaties: Reservatie[];
  zaak: Zaak;
  tafels: Map<number, number>;
  dagen: Dag[];
  calendarOptions: CalendarOptions;
  events = [];
  currentEvents: EventApi[] = [];
  nonworkingdays: Array<number>;
  hiddendays: boolean = false;
  newreservatie: Reservatie;
  newreservaties: Reservatie[] = new Array();
  newreservatierespons: Reservatieresponse;
  tafelslijst: Array<any>;
  constructor(
    private route: ActivatedRoute,
    private reservatiesservice: ReservatieService,
    private zaakService: ZaakService,
    private tokenstorageService: TokenStorageService
  ) {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.getZaak();
  }

  getZaak() {
    this.zaakService
      .getZaak(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((data) => {
        this.zaak = data;
        this.dagen = data.openingsUren.dagen;
        const openingsuren = data.openingsUren.dagen.map((x) =>
          x.openingsUur.toString()
        );

        const sluitingsUren= data.openingsUren.dagen.map((x) =>
          x.sluitingsUur.toString()
        );
        this.reservaties = data.reservaties;
        this.tafelslijst = data.tafels;
        this.tafels = this.aantaltafelsmetzelfdeaantalstoelen();
        this.calendarOptions = {
          plugins: [
            dayGridPlugin,
            resourceTimelinePlugin,
            resourceTimeGridPlugin,
            bootstrapPlugin,
          ],
          themeSystem: 'bootstrap',
          allDaySlot: false,
          height: 'auto',
          businessHours: this.defineOpeningsTijd(),
          timeZone: 'UTC',
          initialView: 'resourceTimeGridDay',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          slotMinTime: this.defineminslot(openingsuren),
          slotMaxTime: this.definemaxslot(sluitingsUren),
          resourceAreaHeaderContent: 'Tafels',
          resources: this.defineResource(),
          initialEvents: this.initializeEvents(),
          weekends: true,
          showNonCurrentDates: true,
          editable: this.isEditable(), ////Determines whether the events on the calendar can be modified.
          selectable: true, //Allows a user to highlight multiple days or timeslots by clicking and dragging
          selectMirror: true,
          selectAllow: this.onlyfuturedates.bind(this),
          dayMaxEvents: true,
          select: this.handleDateSelect.bind(this),
          selectConstraint: 'businessHours',
          eventClick: this.handleEventClick.bind(this),
          eventsSet: this.handleEvents.bind(this),
          headerToolbar: this.defineHeaders(),
        };
      });
  }

  defineminslot(openingsUren: string[]) {
    const min = openingsUren.sort()[0];
    return min;
  }

  definemaxslot(sluitingsUren: string[]) {
    const max = sluitingsUren.sort().reverse()[0];
    return max;
  }

  defineHeaders() {
    if (this.tafelslijst.length < 5) {
      return {
        left: 'prev,next',
        center: 'title',
        right: 'resourceTimeGridDay,resourceTimeGridWeek,resourceTimelineMonth',
      };
    } else {
      return {
        left: 'prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
      };
    }
  }

  isEditable() {
    let role = this.tokenstorageService.getUser().role;
    let email = this.tokenstorageService.getUser().email;
    return role == 'ROLE_UITBATER' && this.zaak.email === email;
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

    return tafels;
  }

  ToggleOpeningDays() {
    this.hiddendays = !this.hiddendays;
    if (this.hiddendays) this.calendarOptions.hiddenDays = this.nonworkingdays;
    else {
      this.calendarOptions.hiddenDays = [];
    }
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

  onlyfuturedates(selectInfo: DateSelectArg) {
    if (selectInfo.start.getTime() >= Date.now()) {
      return true;
    } else {
      return false;
    }
  }

  initializeEvents() {
    for (let reservatie of this.reservaties) {
      const endDate = new Date(
        reservatie.tijdstip.valueOf() +
          reservatie.uurMarge.hours * 60 * 60 * 1000 +
          reservatie.uurMarge.minutes * 60 * 1000
      );
      this.events.push({
        id: reservatie.id,
        title: 'Booked',
        start: `${reservatie.tijdstip}`,
        end: endDate,
        resourceId: `${reservatie.tafel.id}`,
      });
    }

    return this.events;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    alert('Do you want to make a reservation?');
    this.newreservatie = new Reservatie();
    const calendarApi = selectInfo.view.calendar;
    const { calendarOptions } = this;
    calendarApi.unselect(); // clear date selection

    let tafelid = Number(selectInfo.resource.id);
    this.newreservatie.tafel = this.zaak.tafels.find((x) => x.id == tafelid);
    this.newreservatie.id = 0;
    this.newreservatie.klant = this.tokenstorageService.getUser().email;
    this.newreservatie.tijdstip = selectInfo.start;
    this.newreservatie.zaak = this.zaak.id;
    let hours = Math.floor(
      ((selectInfo.end.getTime() - selectInfo.start.getTime()) /
        (1000 * 60 * 60)) %
        24
    );

    if (hours <= 3) {
      let minutes = Math.floor(
        ((selectInfo.end.getTime() - selectInfo.start.getTime()) /
          (1000 * 60)) %
          60
      );

      this.newreservatie.uurMarge = { hours: hours, minutes: minutes };
      this.newreservatie.totaal = this.newreservatie.tafel.stoelen;
      this.newreservatierespons = new Reservatieresponse(this.newreservatie);
      this.reservatiesservice
        .postReservatie(this.newreservatierespons)
        .subscribe((data) => {
          calendarApi.addEvent({
            id: data.id.toString(),
            title: 'Booked',
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            resourceId: selectInfo.resource.id,
          });
        });
    } else {
      alert('Reservatie moet minder lang dan 4u zijn! ');
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (this.isEditable()) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        this.reservatiesservice.deleteById(clickInfo.event.id).subscribe();
        clickInfo.event.remove();
      }
    }
  }
  handleEvents(events: EventApi[]) {

    // events.forEach(event=>this.reservatiesservice.putReservatie())
    this.events.push(events);
  }

  defineOpeningsTijd() {
    const days = [];
    this.nonworkingdays = [1, 2, 3, 4, 5, 6, 0];
    for (let dag of this.dagen) {
      switch (dag.naam) {
        case 'Maandag':
        case 'Ma': {
          var index = this.nonworkingdays.indexOf(1);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          days.push({
            daysOfWeek: [1],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Dinsdag':
        case 'Di': {
          var index = this.nonworkingdays.indexOf(2);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          days.push({
            daysOfWeek: [2],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Woensdag':
        case 'Wo': {
          var index = this.nonworkingdays.indexOf(3);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          days.push({
            daysOfWeek: [3],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Donderdag':
        case 'Do': {
          var index = this.nonworkingdays.indexOf(4);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          this.nonworkingdays.splice(3, 1);
          days.push({
            daysOfWeek: [4],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Vrijdag':
        case 'Vrij': {
          var index = this.nonworkingdays.indexOf(5);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          days.push({
            daysOfWeek: [5],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Zaterdag':
        case 'Zat': {
          var index = this.nonworkingdays.indexOf(6);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          days.push({
            daysOfWeek: [6],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Zondag':
        case 'Zo': {
          var index = this.nonworkingdays.indexOf(0);
          if (index !== -1 && dag.sluitingsUur != dag.openingsUur) {
            this.nonworkingdays.splice(index, 1);
          }
          days.push({
            daysOfWeek: [0],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
      }
    }
    return days;
  }

  get zaaknaam() {
    return this.zaak && this.zaak.naam ? this.zaak.naam : null;
  }
}
