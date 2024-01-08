import { Injectable } from '@angular/core';
import { baseGraphCMSFetch, getsavedTokensInSessionStorage } from '../helpers/base_request';
import { participant } from '../interface/participant';
import { cleanIt } from '../helpers/general';
import { emptyGroup, group } from '../interface/group';
import { HubService } from './hub.service';
import { SMALL_GROUP_LOADED } from '../events';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  group: group = emptyGroup;
  
  constructor(private hub: HubService) { 
    this.init();
  }

  async init(){
    const res = await this.getGroupInfo();
    this.group = res;
    this.hub.notifyArgs(SMALL_GROUP_LOADED, [res]);
  }

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

    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery));
    this.group = res;
    return res;
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
    
    const res = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data?.group;
    return res;
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
