import { Injectable, TemplateRef } from '@angular/core';
import { MessageType } from '../utility/enum';
import { MessageService } from 'primeng/api';
// import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Injectable()
export class CommonApplicationService {

  LoadingTemplate !: TemplateRef<any>;
  LoaderConfig = { 
    //animationType: ngxLoadingAnimationTypes.circleSwish, 
    backdropBorderRadius: '3px', 
    backdropBackgroundColour: '#00000000' 
  };
  constructor(
    private messageService: MessageService,
  ) { }

  showMessage(mesageType: MessageType, title: string, message: string): void {
    switch (mesageType) {
      case MessageType.Success:
        this.messageService.add({ severity: 'success', summary: title, detail: message });
        break;
      case MessageType.Info:
        this.messageService.add({ severity: 'info', summary: title, detail: message });
        break;
      case MessageType.Warning:
        this.messageService.add({ severity: 'warn', summary: title, detail: message });
        break;
      case MessageType.Error:
        this.messageService.add({ severity: 'error', summary: title, detail: message });
        break;
      default:
        break;
    }
  }

  logError(title: string, error: string, isShow: boolean) {
    if (isShow) {
      this.showMessage(MessageType.Error, title, error);
    }
    // #todo log error
  }
}
