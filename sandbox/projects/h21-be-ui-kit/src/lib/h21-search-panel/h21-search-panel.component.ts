import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { SearchFlightDto } from '../../dto/search-flight-dto';
import { FlyRoute } from '../../dto/fly-route';

@Component({
  selector: 'h21-search-panel',
  templateUrl: './h21-search-panel.component.html'
})

export class H21SearchPanelComponent implements OnInit {
	constructor(private _appSubscriber: AppSubscriberService) {
		this.searchOptions = <SearchFlightDto>{
			flyRoutes: [<FlyRoute>{}],
			searchMode: 'round_trip'
		};
	}

	public ngOnInit(): void {

	}

	@Output() onSearch: EventEmitter<SearchFlightDto> = new EventEmitter<SearchFlightDto>();
	@Output() onClearSearch: EventEmitter<void> = new EventEmitter<void>();
	searchOptions: SearchFlightDto;

	addFlyRoute() {
		var flyRoute = <FlyRoute>{};
		var previous = this.searchOptions.flyRoutes[this.searchOptions.flyRoutes.length - 1];
		if (!!previous.cityTo) {
			flyRoute.cityFrom = previous.cityTo;
		}
		this.searchOptions.flyRoutes.push(flyRoute);
	}

	removeFlyRoute() {
		this.searchOptions.flyRoutes.pop();
	}

	canAdd(i: number): boolean {
		return (
				   this.searchOptions.flyRoutes.length == i + 1 && this.searchOptions.searchMode == 'multi_city'
			   );
	}

	canRemove(i: number): boolean {
		return this.searchOptions.searchMode == 'multi_city' && this.searchOptions.flyRoutes.length == i + 1 && i != 0;
	}

	changeMode() {
		switch (this.searchOptions.searchMode) {
			case 'one_way': {
				/*while (this.searchOptions.flyRoutes.length > 1) {
					this.searchOptions.flyRoutes.pop();
				}*/
				break;
			}
			case 'round_trip': {
				/*while (this.searchOptions.flyRoutes.length > 1) {
					this.searchOptions.flyRoutes.pop();
				}*/
				break;
			}
		}
	}

	clearSearch() {
		switch (this.searchOptions.searchMode) {
			case 'one_way': {
				this.searchOptions.flyRoutes[0].cityFrom = null;
				this.searchOptions.flyRoutes[0].cityTo = null;
				break;
			}
			case 'round_trip': {
				this.searchOptions.flyRoutes[0].cityFrom = null;
				this.searchOptions.flyRoutes[0].cityTo = null;
				break;
			}
			case 'multi_city': {
				while (this.searchOptions.flyRoutes.length > 1) {
					this.searchOptions.flyRoutes.pop();
				}
				this.searchOptions.flyRoutes[0].cityFrom = null;
				this.searchOptions.flyRoutes[0].cityTo = null;
				break;
			}
		}
		this._appSubscriber.clearSearch();
	}

	search() {
		console.log(this.searchOptions);
		this._appSubscriber.search(this.searchOptions);
	}
}
