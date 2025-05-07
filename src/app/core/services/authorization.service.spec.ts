import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { UserFunction } from 'src/app/shared/models/user-function.model';

describe('Core: AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService]
    });
    service = TestBed.inject(AuthorizationService);
    service.FunctionList = [
      {
        ApplicationModuleFunctionID: 1501,
        FunctionName: 'Home',
        FunctionCode: 'mnuHome',
        ParentApplicationModuleFunctionID: 0
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should authorize to navigate if the function code passed is 'allow'`, () => {
    expect(service.isAuthorized('allow')).toBeTruthy();
  });

  it(`should authorize the user when navigating to un-authorized page'`, () => {
    expect(service.isAuthorizedByRoute('/mdi/un-authorized')).toBeTruthy();
    expect(service.isAuthorizedByRoute('/mdi/sample/controls')).toBeTruthy();
  });

  it(`should not authorize if there are no functions assigned`, () => {
    service.FunctionList = [];
    expect(service.isAuthorized('mnuDBCylinderShortageView')).toBeFalsy();
  });

  it(`should not authorize if the requested function access not granted`, () => {
    expect(service.isAuthorized('mnuDBCylinderShortageView')).toBeFalsy();
  });

  it(`should authorize if the requested function access granted`, () => {
    expect(service.isAuthorized('mnuHome')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Cylinder Shortage'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBCylinderShortageView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/cylinder-shortage')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Filling'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBFillingView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/filling')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Stock'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBStockView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/stock')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Orders'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBOrderView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/orders')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Trips'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBTripView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/trips')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Truck Tracking'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBTruckTrackingView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/truck-tracking')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Map'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBMapView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/map')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Kpi'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBKpiView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/kpi')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Trip Wise Shortage'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBTripwiseShortageView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/trip-wise-shortage')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Setting'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBDashboardSettingView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/setting')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'DSB - Reorder Level'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuDBReorderLevelView',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/dashboard/reorder-level')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Item Supervision'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuItemSupervision',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/item-supervision')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Initialization'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuStandardInitialization',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/initialization')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Lite Initialization'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuLightInitialization',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/lite-initialization')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Item Display'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuItemDisplay',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/common/item-display')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Change Barcode'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuChangeBarcode',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/change-barcode')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Bulk Initialization'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuBulkInitialization',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/bulk-initialization')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Supplier-management`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuSupplierManagement',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/supplier-management')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Supplier Bulk Upload'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuSupplierBulkUpload',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/supplier-bulk-upload')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Supplier Cylinder Initialization'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuSupplierCylinderInitialization',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/supplier-cylinder-initialization')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INI - Supplier Cylinder Initialization'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuSupplierReturn',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/initialization/supplier-return')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'TST - Start Test'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuNewCylinderTest',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/testing/start-test')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'TST - Cylinder Test Supervision`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuCylinderTestSupervision',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/testing/cylinder-test-supervision')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'TST - Cylinder Test`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuNewCylinderTest',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/testing/cylinder-test')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'TST - Cylinder Test Approval'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuCylinderTestSupervision',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/testing/cylinder-test-approval')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INV - Reconciliation'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuReconciliation',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/inventory/reconciliation')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'INV - Reconciliation Detail'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuReconciliation',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/inventory/reconciliation-detail')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'CFG - Test Function Supervision'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuTestSupervision',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/configuration/test-function-supervision')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'CFG - Test Function'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuTestFunction',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/configuration/test-function')).toBeTruthy();
  });

  it(`should authorize if the user has access to 'CFG - Test Template'`, () => {
    let userFunction: UserFunction;
    userFunction = {
      ApplicationModuleFunctionID: 0,
      FunctionName: '',
      FunctionCode: 'mnuTestTemplate',
      ParentApplicationModuleFunctionID: 0
    };
    service.FunctionList.push(userFunction);
    expect(service.isAuthorizedByRoute('/mdi/configuration/test-template')).toBeTruthy();
  });

  it(`should not authorize there is no matching functioncode defined'`, () => {
    expect(service.isAuthorizedByRoute('unknown')).toBeFalsy();
  });

});
