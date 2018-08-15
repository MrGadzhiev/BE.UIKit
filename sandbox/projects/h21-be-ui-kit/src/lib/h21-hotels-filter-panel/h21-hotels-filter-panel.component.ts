import { Component } from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material";

const ALL_TAGS: Array<any> = [
	{id: 1, name: "Disabled guest"},
	{id: 2, name: "Breakfast"},
	{id: 3, name: "Room service"},
	{id: 4, name: "Non-smoking rooms"},
	{id: 5, name: "Swimming pool"},
	{id: 6, name: "Bar"},
	{id: 7, name: "WiFi available in all areas"},
];

@Component({
	selector: 'h21-hotels-filter-panel',
	templateUrl: './h21-hotels-filter-panel.component.html'
})

export class H21HotelsFilterPanelComponent {

	allTags: Array<any>;
	selectedTags: Array<any>;

	matExpansionPanelHeaderDefaultHeight = '44px';

	minPrice = 1;
	maxPrice = 5000;
	currencyName = 'EUR';

	priceSliderConfig: any = {
		behaviour: 'drag',
		connect: true,
		start: [250, 750],
		step: 1,
		tooltips: [ true, true ],
		range: {
			min: this.minPrice,
			max: this.maxPrice
		},
	};

	constructor() {
		this.allTags = ALL_TAGS;
		this.selectedTags = ALL_TAGS.slice(0, ALL_TAGS.length);
	}

	addTag(event: MatAutocompleteSelectedEvent): void {
		let index = this.allTags.findIndex((item) => { return item.name == event.option.viewValue; })
		this.selectedTags.push(this.allTags[index]);
	}

	removeTag(id: number): void {
		let index = this.selectedTags.findIndex((item) => { return item.id == id; })
		if (index >= 0) {
			this.selectedTags.splice(index, 1);
		}
	}
}