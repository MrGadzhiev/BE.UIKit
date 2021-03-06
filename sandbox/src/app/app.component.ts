import {Component, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {
	MatIconRegistry,
	MatSidenav
} from '@angular/material';
import {DocsComponent} from "./docs/docs.component";
import {DocsNavigationComponent} from "./docs-navigation/docs-navigation.component";
import {Router} from '@angular/router';
import {H21SidebarComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component";
import {H21RightOverlayPanelService} from "../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.service";
import {IBreadcrumb} from "../../projects/h21-be-ui-kit/src/dto/i-breadcrumb";
import {AppSubscriberService} from "../../projects/h21-be-ui-kit/src/services/app-subscriber-service";
import {ISidebarNavTab} from "../../projects/h21-be-ui-kit/src/dto/i-sidebar-nav-tab";
import {ISearchHotelOptions} from "../../projects/h21-be-ui-kit/src/dto/i-search-hotel-options";
import {H21HotelSearchResultComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-hotel-search-result/h21-hotel-search-result.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry],
})

export class AppComponent {
	@ViewChild(DocsNavigationComponent) private docsNavigation: DocsNavigationComponent;
	@ViewChild(DocsComponent) private docs: DocsComponent;
	@ViewChild(H21SidebarComponent) private sidebar: H21SidebarComponent;

	title = 'HORSE21.PRO - Component design system';
	subscription: any;
	sidebarOpened = false;

	breadcrumbsData: Array<IBreadcrumb> = [
		{label: "Home", url: "#"},
		{label: "Company", url: "#"},
		{label: "My Company", url: "#"},
		{label: "My User", url: "#"}
	];

	constructor(iconReg: MatIconRegistry, sanitizer: DomSanitizer, public router: Router, private rightPanelDialog: H21RightOverlayPanelService, private _appSubscriber: AppSubscriberService) {
		iconReg.addSvgIcon('logo',						sanitizer.bypassSecurityTrustResourceUrl('./assets/img/horse21-logo.svg'));
		iconReg.addSvgIcon('h21_flight_land_blue',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-blue-icon.svg'));
		iconReg.addSvgIcon('h21_flight_land_green',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-green-icon.svg'));
		iconReg.addSvgIcon('h21_flight_land_red',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-red-icon.svg'));
		iconReg.addSvgIcon('h21_flight_takeoff_blue',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-blue-icon.svg'));
		iconReg.addSvgIcon('h21_flight_takeoff_green',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-green-icon.svg'));
		iconReg.addSvgIcon('h21_flight_takeoff_red',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-red-icon.svg'));

		iconReg.addSvgIcon('h21_baggage',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-baggage-blue.svg'));
		iconReg.addSvgIcon('h21_no_baggage', 	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-baggage-gray.svg'));
		iconReg.addSvgIcon('h21_luggage',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-luggage-blue.svg'));
		iconReg.addSvgIcon('h21_no_luggage',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-luggage-gray.svg'));
		iconReg.addSvgIcon('h21_night',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-night-blue.svg'));
		iconReg.addSvgIcon('h21_back_to_list',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-back-to-list-gray.svg'));
	}

	ngOnInit() {
		if (this.docsNavigation) {
			this.subscription = this.docsNavigation.getEmitter()
				.subscribe(item => this.docs.changeComponent(item));
		}
	}

	toggleSidebarOpened() {
		this.sidebarOpened = !this.sidebarOpened;
	}

	isDemo(): boolean {
		return this.router.url.indexOf('/demo') == 0;
	}

	changeComponent(event): void {
		this.docs.changeComponent(event);
	}

	openHelpSection(): void {
		this.rightPanelDialog.open('h21-help');
	}


	/* For prototype */

	@ViewChild('leftSidenav') private leftSidenav: MatSidenav;
	@ViewChild('searchResult') private searchResult: H21HotelSearchResultComponent;

	activeLeftSidenavPanel: string = 'search';
	sidenavOpened: boolean = true;
	searchResultVisibility: boolean = false;
	searchResultViewMode: string = 'list';
	sidebarNavDisabled: boolean = false;

	leftSidenavToggle() {
		this.leftSidenav.toggle();
		if (this.leftSidenav.opened) {
			this.sidebarNavDisabled = false;
			this.searchResultViewMode = 'list';
			this.sidenavOpened = true;
		} else {
			this.sidebarNavDisabled = true;
			this.sidenavOpened = false;
		}
	}

	showSidebarPanel(tab: ISidebarNavTab): void {
		if (!this.leftSidenav.opened) {
			this.leftSidenavToggle();
		}
		this.activeLeftSidenavPanel = tab.name;
	}

	search(options: ISearchHotelOptions): void {
		this.searchResultVisibility = true;
		setTimeout(() => {
			this.searchResult.search(options);
		}, 0);
	}

	clearSearch(): void {
		this.searchResultVisibility = false;
		this.searchResult.clear();
	}

	changeResultViewMode(mode: string): void {
		this.searchResultViewMode = mode;

		if (mode == 'map') {
			this.leftSidenavToggle();
		}
	}
}
