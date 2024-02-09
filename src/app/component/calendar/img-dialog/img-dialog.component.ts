import { Component } from '@angular/core';
import {  CLOSE_DIALOG, CLOSE_IMG_DIALOG_DELETE, OPEN_IMG_DIALOG } from 'src/app/events';
import { EventphotoService } from 'src/app/service/eventphoto.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.css']
})
export class ImgDialogComponent {
  imgUrl: string = "";
  imgId: string = "";

  closeDialog(){
    this.hub.notify(CLOSE_DIALOG);
  }

  constructor(private hub: HubService, public intl: TranslateService, private eventPhotoService: EventphotoService){
    this.hub.subscribe(OPEN_IMG_DIALOG, (args: any) => {
      this.imgUrl = args.imgUrl;
      this.imgId = args.imgId;
    });
  }

  async deleteImg(){
    if(confirm(this.intl.translate("prompt_confirm_img_delete"))){
      await this.eventPhotoService.deleteImg(this.imgId);
      this.hub.notifyArgs(CLOSE_IMG_DIALOG_DELETE, [this.imgId]);
    }
  }
}
