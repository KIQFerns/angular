import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../environments/environment.development';
import { Isession } from './Isession';
import { Imail } from './Imail';
import { Imessages } from './Imessages';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  generateSession() {
    return this.httpClient.get<Isession>(`${API_PATH}?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D`)
  }

  generateMail() {
    return this.httpClient.get<Imail>(`${API_PATH}?query=mutation%20(%24input%3A%20IntroduceAddressInput!)%20%7BintroduceAddress(input%3A%20%24input)%20%7Baddress%2C%20restoreKey%7D%7D&variables=%7B%22input%22%3A%7B%22sessionId%22%3A%22${localStorage.getItem('session')}%22%7D%7D
    `)
  }

  generateMessages() {
    return this.httpClient.get<Imessages>(`${API_PATH}?query=query%20(%24id%3A%20ID!)%20%7Bsession(id%3A%24id)%20%7B%20addresses%20%7Baddress%7D%2C%20mails%7BrawSize%2C%20fromAddr%2C%20toAddr%2C%20downloadUrl%2C%20text%2C%20headerSubject%7D%7D%20%7D&variables=%7B%22id%22%3A%22${localStorage.getItem('session')}%22%7D
    `)
  }
}
