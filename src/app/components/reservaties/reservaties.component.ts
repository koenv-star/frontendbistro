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
  nonworkingdays: any[];
  hiddendays: boolean = false;
  newreservatie: Reservatie;
  newreservaties: Reservatie[] = new Array();
  newreservatierespons: Reservatieresponse;
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
        this.reservaties = data.reservaties;
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
          slotMinTime: '10:00:00',
          slotMaxTime: '23:00:00',
          resourceAreaHeaderContent: 'Tafels',
          resources: this.defineResource(),
          initialEvents: this.initializeEvents(),
          weekends: true,
          editable: this.isEditable(), ////Determines whether the events on the calendar can be modified.
          selectable: true, //Allows a user to highlight multiple days or timeslots by clicking and dragging
          selectMirror: true,
          // validRange: {
          //   start: Date.now(),
          // },
          dayMaxEvents: true,
          select: this.handleDateSelect.bind(this),
          selectConstraint:"businessHours",
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

  isEditable() {
    let role = this.tokenstorageService.getUser().role;
    console.log(role);
    return role == 'ROLE_UITBATER';
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
    const { calendarOptions } = this;
    this.hiddendays = !this.hiddendays;
    if (this.hiddendays) calendarOptions.hiddenDays = this.nonworkingdays;
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

    if (hours<=3) {
    let minutes = Math.floor(
      ((selectInfo.end.getTime() - selectInfo.start.getTime()) / (1000 * 60)) %
        60
    );

    this.newreservatie.uurMarge = { hours: hours, minutes: minutes };
    this.newreservatie.totaal = this.newreservatie.tafel.stoelen;
    this.newreservatierespons = new Reservatieresponse(this.newreservatie);
    console.log(this.newreservatierespons);
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
      });}

      else{ alert("Reservatie moet minder lang dan 4u zijn! ")}
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (this.isEditable()) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        console.log(clickInfo.event.id);
        this.reservatiesservice.deleteById(clickInfo.event.id).subscribe();
        clickInfo.event.remove();
      }
    }
  }
  handleEvents(events: EventApi[]) {
    console.log(events);

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
          this.nonworkingdays.shift();
          days.push({
            daysOfWeek: [1],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Dinsdag':
        case 'Di': {
          this.nonworkingdays.splice(1, 1);
          days.push({
            daysOfWeek: [2],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Woensdag':
        case 'Wo': {
          this.nonworkingdays.splice(2, 1);
          days.push({
            daysOfWeek: [3],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Donderdag':
        case 'Do': {
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
          this.nonworkingdays.splice(4, 1);
          days.push({
            daysOfWeek: [5],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Zaterdag':
        case 'Zat': {
          this.nonworkingdays.splice(5, 1);
          days.push({
            daysOfWeek: [6],
            startTime: dag.openingsUur, // 8am
            endTime: dag.sluitingsUur,
          });
          break;
        }
        case 'Zondag':
        case 'Zo': {
          this.nonworkingdays.pop();
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

  get tafelslijst() {
    return this.zaak && this.zaak.tafels ? this.zaak.tafels : null;
  }
}
