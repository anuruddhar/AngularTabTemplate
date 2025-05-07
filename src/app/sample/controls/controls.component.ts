import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, SelectItem, MessageService, TreeNode, MenuItem } from 'primeng/api';

import { BaseComponent } from 'src/app/shared/base/base.component';
import { Car } from '../car';
import { RouteManagerService } from 'src/app/core/services/route-manager.service';
import { ControlViewModel } from './controls-view.model';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import { Product } from '../domain/product';
import { SampleService } from '../sample.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent extends BaseComponent<ControlViewModel> {
  cities: SelectItem[];

  files!: TreeNode[];

  sourceCars!: Car[];

  targetCars!: Car[];

  data: any;

  selectedCity!: string;

  val!: string;

  options: SelectItem[];

  selectedOption!: string;

  display = false;

  cars!: Car[];

  cars1!: Car[];

  cars2: Car[];

  cars3!: Car[];

  date!: string;

  text!: string;

  filteredCountriesSingle!: any[];

  items1!: MenuItem[];

  items2!: MenuItem[];

  splitMenuItems!: MenuItem[];

  country: any;

  products!: Product[];
  cols!: Column[];

  constructor(
    routeManagerService: RouteManagerService,
    router: Router,
    messageService: MessageService,
    globalChangeNotifierService: GlobalChangeNotifierService,
    confirmationService: ConfirmationService,
    private productService: SampleService) {
    super(routeManagerService, messageService, router, globalChangeNotifierService, new ControlViewModel(), '');
    this.Title = 'Controls';
    this.cars = [
      { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
      { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
      { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
      { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
      { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
      { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
      { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
      { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
      { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
    ];
    this.cars2 = [
      { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
      { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
      { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
      { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
      { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
      { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
      { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
      { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
      { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
    ];

    this.cities = [];
    this.cities.push({ label: 'Select Cities', value: 'Select Cities' });
    this.cities.push({ label: 'New York', value: 'New York' });
    this.cities.push({ label: 'Rome', value: 'Rome' });
    this.cities.push({ label: 'London', value: 'London' });
    this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
    this.cities.push({ label: 'Paris', value: 'Paris' });

    this.options = [];
    this.options.push({ label: 'Option 1', value: 'Option 1' });
    this.options.push({ label: 'Option 2', value: 'Option 2' });
    this.options.push({ label: 'Option 3', value: 'Option 3' });
    this.options.push({ label: 'Option 4', value: 'Option 4' });
    this.options.push({ label: 'Option 5', value: 'Option 5' });

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  protected override async pageOnInit(): Promise<void> {
    try {
      this.moduleOnInit();
    } catch (error) {

    }
  }


  moduleOnInit(): void {

    this.productService.getProductsMini().then((data) => {
      this.products = data;
  });

  this.cols = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'inventoryStatus', header: 'Status' },
    { field: 'rating', header: 'Rating' }
];

    // this.carService.getCarsMedium().subscribe(
    //   products => {
    //     this.cars = products;
    //   }
    // );

    // this.nodeService.getFiles().subscribe(
    //   products => {
    //     this.files = products;
    //   }
    // );

    this.targetCars = [];

    // this.carService.getCarsSmall().subscribe(
    //   products => {
    //     this.cars1 = products;
    //   }
    // );

    // this.carService.getCarsSmall().subscribe(
    //   products => {
    //     this.cars3 = products;
    //   }
    // );

    this.items1 = [{
      label: 'File',
      items: [
        { label: 'New', icon: 'fa fa-fw fa-plus' },
        { label: 'Open', icon: 'fa fa-fw fa-download' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', icon: 'fa fa-fw fa-refresh' },
        { label: 'Redo', icon: 'fa fa-fw fa-repeat' }
      ]
    }];

    this.items2 = [
      {
        label: 'File',
        icon: 'fa fa-fw fa-file-o',
        items: [{
          label: 'New',
          icon: 'fa fa-fw fa-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa fa-fw fa-edit',
        items: [
          { label: 'Undo', icon: 'fa fa-fw fa-mail-forward' },
          { label: 'Redo', icon: 'fa fa-fw fa-mail-reply' }
        ]
      },
      {
        label: 'Help',
        icon: 'fa fa-fw fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa fa-fw fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa fa-fw fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa fa-fw fa-refresh',
            items: [
              { label: 'Save', icon: 'fa fa-fw fa-save' },
              { label: 'Update', icon: 'fa fa-fw fa-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'fa fa-fw fa-phone',
            items: [
              { label: 'Delete', icon: 'fa fa-fw fa-minus' }
            ]
          }
        ]
      }
    ];

    this.splitMenuItems = [
      { label: 'Update', icon: 'fa fa-fw fa-refresh' },
      { label: 'Delete', icon: 'fa fa-fw fa-close' },
      { label: 'Angular.io', icon: 'fa fa-fw fa-link', url: 'http://angular.io' },
      { label: 'Theming', icon: 'fa fa-fw fa-paint-brush', routerLink: ['/theming'] }
    ];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
              return 'unknown';
      }
  }

  showDialog() {
    this.display = true;
  }

  filterCountrySingle(event: any) {
    const query = event.query;
    // this.countryService.getCountries().then(countries => {
    //   this.filteredCountriesSingle = this.filterCountry(query, countries);
    // });
  }

  filterCountry(query: any, countries: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

}
