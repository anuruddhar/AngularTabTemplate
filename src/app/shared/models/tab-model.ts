import { TabFormViewModel } from './tab-form-view.model';

export class Tab {
    id: string = '';
    title: string = '';
    url: string = '';
    tabFormViewModel: TabFormViewModel = new TabFormViewModel();
    isDirty: boolean = false;
    bundle: any;
    bundleArray = []; 
}
