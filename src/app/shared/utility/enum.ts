export enum MessageType {
    Success,
    Info,
    Warning,
    Error
}

export enum DiscrepancyType {
    None,
    Warning,
    Block
}

export enum ItemStateType {
    None = 0,
    Cylinder = 1,
    COP = 2,
    Basket = 3,
    Bundle = 4,
    DryIceBox = 5,
    LiquidGasCylinder = 6,
    TransportRack = 7
}

export enum CustomerSearcherType {
    InventoryLocation = 0,
    Customer = 1,
    Distributor = 2,
    All = 3
}

export enum ProductSearcherType {
    Customer,
    Other
}

export enum LocationStatus {
    None = 0,
    AtCustomer = 1,
    OnSite = 2,
    InTransit = 3,
    Assigned = 4,
    New = 5,
    InBundle = 6
}

export enum BlockingStatus {
    Authorized = 0,
    Blocked = 1
}

export enum FillingStatus {
    None = 0,
    Full = 1,
    OnHold = 2,
    Empty = 3
}

export enum FillingType {
    OneStep,
    TwoStep
}

export enum InitializationMode {
    Insert = 0,
    Update = 1,
    Synchronization = 2
}

export enum InitializationType {
    Standard = 0,
    Light = 1
}

export enum DatePeriod {
    Week = 0,
    Month = 1,
    ThreeMonths = 2,
    All = 3
}

export enum CustomerType {
    All = 99,
    Depot = 0,
    DirectCustomer = 1,
    Agent = 3,
    AgentCustomer = 4,
    Supplier = 5,
    Branch = 6,
    None = -1
}

export enum AssignmentSearchMode {
    Consignment = 0,
    DeliveryNote = 1
}

export enum AssignmentMode {
    Consignment = 0,
    DeliveryNote = 1
}


export enum DeliveryItemType {
    Delivery = 0,
    Return = 1
}

export enum ConsignmentType {
    Unknown = 0,
    Primary = 1,
    Secondary = 2,
    Mixed = 3
}

export enum DeliveryOrderType {
    None = 0,
    CustomerPickup = 1,
    StandardDelivery = 2,
    DeliveryToDistributor = 3,
    ExcludeMinDel = 4,
    AgentsDocket = 5,
    ConsignmentNote = 6,
    SuspectCylExchange = 7,
    AdjustmentDO = 8,
    SpecialGas = 9,
    CDO = 10,
    Primary = 11,
    AgentsDelivery = 12,
    ElectSpecialGas = 13
}

export enum OrderStatus {
    D, // Delivered
    P, // Printed
    N, // Not processed
    S, // Signed
    C, // Cancelled
    B // Back Order
}

export enum DeliveryOrderStatus {
    Open = 0,
    Assign_In_Progress = 10,
    Assign_To_Be_Checked = 15,
    Assign_Valid = 20,
    Downloaded = 30,
    In_Transit = 35,
    Uploaded = 40,
    Confirmed = 50
}

export enum DeliveryOrderSearchResult {
    IsParentPoDoConfirm
}

export enum ConsignmentStatus {
    Open = 0,
    Assign_In_Progress = 10,
    Assign_To_Be_Checked = 15,
    Assign_Valid = 20,
    Downloaded = 30,
    In_Transit = 35,
    Uploaded = 40,
    Confirmed = 50
}

export enum CustomerSatisfaction {
    Notavailable = 0,
    High = 1,
    Medium = 2,
    Low = 3,
    Skip = 4
}


export enum ProductType {
    II = 0,
    NII = 1,
}

export enum RecordStatus {
    None = 0,
    Inserted = 1,
    Updated = 2,
    Deleted = 3,
}


export enum ReconciliationSearchType {
    Account = 0,
    Customer = 1,
}

export enum ApplicationType {
    RC = 0,
    HHC = 1
}

export enum MoveToType {
    Customer = 1,
    Plant = 2,
    Barcode = 3,
    Distributor = 4
}

export enum MoveToFormMode {
    MoveTo,
    Inventory
}

export enum PushPullType {
    None = 0,
    Push = 1,
    Pull = 2
}

export enum FormMode {
    Create = 0,
    Modify = 1,
    CopyData = 2,
    BulkInit = 3,
}

export enum POSearchType {
    All = 0,
    Outstanding = 1,
    Completed = 2,
    Expired = 3,
    Cancelled = 4
}

export enum POSearchBy {
    AccountNumber = 3,
    CDFNumber = 4,
    CustomerName = 0,
    CustomerNumber = 1,
    PurchaseOrderNumber = 2
}

export enum POSearchOption {
    All,
    CreditAdjustment
}


export enum InventoryLocationType {
    None = 0,
    WareHouse = 1,
    FillingStation = 2,
    Distributor = 3,
    LocationCustomerSupport = 4,
    VirtualSite = 5,
    Vendor = 6,
    Customer = 7,
    Depot = 8
}

export enum BlockingPolicyStatus {
    All = -1,
    New = 0,
    Start = 5,
    Started = 10,
    Stop = 15,
    Cancel = 20,
    Cancelled = 25
}

export enum TPRExemptionType {
    DeliveryType = 0,
    CustomerType = 1,
    Customer = 2
}
export enum PartialDOSearchMode {
    CustomerNo = 0
}
