import { Injectable } from '@angular/core';
import { baseGraphCMSFetch, checkIfLoggedIn, getsavedTokensInSessionStorage } from '../helpers/base_request';
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
  
  constructor(private hub: HubService) {}

  async init(tokens?: any){
    try {
      if (!this.group.id || !this.group.name){
        const res = await this.getGroupInfo(tokens);

        const sortedParticipants = res.participants.filter((x: participant) => x.role === "leader").sort((a: participant, b: participant) => a.name > b.name ? 1 : -1)
        .concat(res.participants.filter((x: participant) => x.role === "member").sort((a: participant, b: participant) => a.name > b.name ? 1 : -1))
        .concat(res.participants.filter((x: participant) => x.role === "guest").sort((a: participant, b: participant) => a.name > b.name ? 1 : -1));        
        res.participants = sortedParticipants;
        
        this.group = res;
      }
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
    
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

  async getGroupInfo(tokens?: any){
    const token = checkIfLoggedIn() ? getsavedTokensInSessionStorage() : tokens;

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
    
    const res: group = (await baseGraphCMSFetch(token.apiUrl, token.authToken, cmsQuery))?.data?.group;
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
