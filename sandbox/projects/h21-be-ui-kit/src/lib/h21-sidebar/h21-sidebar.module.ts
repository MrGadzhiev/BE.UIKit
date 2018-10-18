import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SidebarComponent} from "./h21-sidebar.component";
import {MatButtonModule, MatIconModule, MatProgressBarModule} from "@angular/material";
import {H21AirSearchPanelModule} from "../h21-air-search-panel/h21-air-search-panel.module";
import {H21AirSearchResultModule} from "../h21-air-search-result/h21-air-search-result.module";
import {H21AirFilterPanelModule} from "../h21-air-filter-panel/h21-air-filter-panel.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		H21AirSearchPanelModule,
		H21AirSearchResultModule,
		H21AirFilterPanelModule
	],
	declarations: [H21SidebarComponent],
	exports: [H21SidebarComponent]
})
export class H21SidebarModule {

}
