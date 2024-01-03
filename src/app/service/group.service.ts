import { Injectable } from '@angular/core';
import { baseGraphCMSFetch, getsavedTokensInSessionStorage } from '../helpers/base_request';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  async getGroupInfo(){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = { 
      query : `
          query MyQuery {
              group(where: {id : "${token.groupID}"}) {
                  id
                  name
                  participants
              }
          }
    `};
    
    return (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data?.group;
  }

}
