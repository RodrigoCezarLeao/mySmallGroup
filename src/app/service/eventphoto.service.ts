import { Injectable } from '@angular/core';
import { baseGraphCMSFetch, getsavedTokensInSessionStorage } from '../helpers/base_request';

@Injectable({
  providedIn: 'root'
})
export class EventphotoService {

  constructor() { }

  async deleteImg(imgId: string){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = {
        query: `
            mutation {
              unpublishEventPhoto(where:{id: "${imgId}"}) {
                    id
                }
            }
        `
    };

    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data?.unpublishEventPhoto?.id;
    return res;
  }

  async getEventPhotos(eventId: string){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = { 
      query : `
        query{
          eventPhotos(where: {eventId: "${eventId}"}){
            id
            img {      
              url
            }
          }
        }
      `};
        

    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data;    
    return res?.eventPhotos.map((x: any) => ({id: x.id, url: x.img.url}) ) ?? [];
  }

  async uploadAsset(asset: FormData, eventId: string){    
    const token = getsavedTokensInSessionStorage();
    const url = token.apiUrl + "/upload";
    const bearerToken = token.authToken;


    // Upload Asset
    try {
        var response = await fetch(url, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${bearerToken}`
            },
            body: asset
        });
        
        var data = await response.json();
    }catch(error){
        console.log(error);
    }


    // Create Asset Event Ref
    const cmsQuery = { 
      query : `
        mutation {
          createEventPhoto(data: {
            groupId: "${token.groupID}",
            eventId:"${eventId}",            
            img: {connect: {id: "${data.id}"}},
          }){id, img{ url }}
        }
    `};
        

    const res = (await baseGraphCMSFetch(token.apiUrl, bearerToken, cmsQuery))?.data;

    await this.publishAsset(data.id);
    await this.publishEventPhoto(res?.createEventPhoto?.id);
    
    return {id: res.createEventPhoto.id, url: res.createEventPhoto.img.url};
  }

  async publishAsset(dataId: string){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = {
        query: `
            mutation {
                publishAsset(to:PUBLISHED, where:{id: "${dataId}"}) {
                    id
                }
            }
        `
    };

    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery));
    return res;
  }

  async publishEventPhoto(eventPhotoId: string){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = {
        query: `
            mutation {
                publishEventPhoto(to:PUBLISHED, where:{id: "${eventPhotoId}"}) {
                    id
                }
            }
        `
    };

    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery));
    return res;
  }
}
