import { Injectable } from '@angular/core';
import { baseGraphCMSFetch, getsavedTokensInSessionStorage } from '../helpers/base_request';
import { participant } from '../interface/participant';
import { cleanIt } from '../helpers/general';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  async publishGroup(){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = {
        query: `
            mutation {
                publishGroup(to:PUBLISHED, where:{id: "${token.groupID}"}) {
                    id
                }
            }
        `
    };

    return (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery));
  }

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

  async updateGroupName(name: string){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = { 
      query : `
          mutation {
              updateGroup(data: {
                name: "${name}",                
              }, where: {id: "${token.groupID}"}) { id }
          }
    `};
    
    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data?.updateGroup;
    await this.publishGroup();
    return res;
  }

  async updateGroupParticipants(participants: participant[]){
    const token = getsavedTokensInSessionStorage();

    const cmsQuery = { 
      query : `
          mutation {
              updateGroup(data: {
                participants: ${cleanIt(participants)},                
              }, where: {id: "${token.groupID}"}) { id }
          }
    `};
    
    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data?.updateGroup;
    await this.publishGroup();
    return res;
  }
}
