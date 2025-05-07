import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../shared/globals';
import { RouteConstant } from '../shared/route-constant';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  UserId!: string;
  CurrentTime: any;
  InventoryLocationName: string;
  IsShowMainMenus: boolean;
  IsShowDashboardMenus: boolean;
  IsShowInitializationMenus: boolean;

  // Mar 13, 2019 11:18 AM
  constructor(private router: Router) {
    this.IsShowMainMenus = true;
    this.IsShowDashboardMenus = false;
    this.IsShowInitializationMenus = false;
    this.InventoryLocationName = '';
    setInterval(() => {
      this.CurrentTime = Date.now();
    }, 1);
  }

  ngOnInit() {
    this.UserId = GlobalVariable.UserID;
  }

  //#region Dashboard
  onDashboardClicked(): void {
    this.IsShowDashboardMenus = true;
    this.IsShowMainMenus = false;
    alert('Dashboard clicked');
    // this.router.navigate(['/mdi/dashboard/cylinder-shortage']);
  }

  onDBCylinderShortageClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.CYLINDER_SHORTAGE}`]);
  }

  onDBFillingClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.FILLING}`]);
  }

  onDBStockClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.STOCK}`]);
  }

  onDBOrdersClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.ORDERS}`]);
  }

  onDBTripsClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.TRIP}`]);
  }

  onDBMapClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.MAP}`]);
  }

  onDBKPIClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.KPI}`]);
  }

  onDBTripwiseShortageClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.TRIP_WISE_SHORTAGE}`]);
  }

  onDBReorderLevelClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.REORDER_LEVEL}`]);
  }

  onDBSettingsClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.SETTING}`]);
  }

  onDbBackClicked(): void {
    this.IsShowDashboardMenus = false;
    this.IsShowMainMenus = true;
  }
  //#endregion

  //#region Initialization
  onInitalizationClicked(): void {
    this.IsShowMainMenus = false;
    this.IsShowInitializationMenus = true;
    // this.router.navigate(['/mdi/initialization/item-display']);
  }

  onItemSupervisionClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.ITEM_SUPERVISION}`]);
  }

  onStandardInitializationClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.STD_INITIALIZATION}`]);
  }

  onLiteInitializationClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.LITE_INITIALIZATION}`]);
  }

  onBulkInitializationClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.BULK_INITIALIZATION}`]);
  }

  onSupplierManagementClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.SUPPLIER_MANAGEMENT}`]);
  }

  onBulkUploadClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.SUPPLIER_BULK_UPLOAD}`]);
  }

  onSupplierCylInitializationClicked(): void {
    this.router.navigate([`/mdi/${RouteConstant.SUPPLIER_CYLINDER_INITIALIZATION}`]);
  }

  onSupplierReturn(): void {
    this.router.navigate([`/mdi/${RouteConstant.SUPPLIER_RETURN}`]);
  }

  onInitBackClicked(): void {
    this.IsShowInitializationMenus = false;
    this.IsShowMainMenus = true;
  }
  //#endregion

 // Production
 onProdClick(): void {
    this.router.navigate(['/mdi/delivery-order/create']);
  }
 // Initialization
  onTestingClick(): void {
    this.router.navigate(['/mdi/testing/cylinder-test-supervision']);
  }
}
