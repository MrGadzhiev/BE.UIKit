import { Component } from "@angular/core"

@Component({
  selector: 'icons-example',
  template: `
  <section class="docs mat-typography">
    <h1>{{title}}</h1>
    <h2>Custom icons</h2>
    <mat-grid-list cols="5" class="docs_icons-preview-grid">
      <mat-grid-tile *ngFor="let icon of h21Icons">
        <div class="icon-preview icon-preview__icon-size-48" matTooltip="<mat-icon svgIcon=\'{{icon}}\'></mat-icon>" [matTooltipPosition]="'below'">
          <mat-icon svgIcon="{{icon}}">{{icon}}</mat-icon><br />
          <span class="">{{icon.replace('_',' ')}}</span>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
    <div class="line-separator"></div>
    <h2>Used material icons</h2>
    <mat-grid-list cols="5" class="docs_icons-preview-grid">
      <mat-grid-tile *ngFor="let icon of matIcons">
        <div class="icon-preview" matTooltip="<mat-icon>{{icon}}</mat-icon>" [matTooltipPosition]="'below'">
          <mat-icon class="">{{icon}}</mat-icon><br />
          <span>{{icon.replace('_',' ')}}</span>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  </section>`
})

export class IconsExampleComponent {
  title = 'Icons';
  h21Icons = [
    'h21_flight_land_blue',
    'h21_flight_land_green',
    'h21_flight_land_red',
    'h21_flight_takeoff_blue',
    'h21_flight_takeoff_green',
    'h21_flight_takeoff_red'
  ];

  matIcons = [
    'attach_money',
    'cancel',
    'check_circle',
    'close',
    'flight_land',
    'flight_takeoff',
    'history',
    'info',
    'menu',
    'person',
    'search',
    'supervisor_account',
    'swap_horiz',
    'today',
  ];
}