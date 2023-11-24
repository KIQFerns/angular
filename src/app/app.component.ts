import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { MailService } from './mail.service';
import { Isession } from './Isession';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CountdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  mainTitle = ""
  mainMessage = ""

  session: Isession | undefined
  tempMail: string = ''
  messages: Array<{
    toAddr: string;
    text: string;
    rawSize: number;
    headerSubject: string;
    fromAddr: string;
    downloadUrl: string;
  }> = [];

  constructor(private mailService: MailService) { }

  generateMail() {
    this.mailService.generateMail()
      .subscribe(mail => this.tempMail = mail?.data?.introduceAddress?.address)
  }

  generateMessages() {
    this.mailService.generateMessages()
      .subscribe(mail => this.messages = mail?.data?.session?.mails)
  }

  ClipBoardCopy(input: any) {
    input.select();
    document.execCommand('copy');
    input.selectRange(0, 0)
  }

  showText(title:string, message:string) {
    this.mainTitle = title;
    this.mainMessage = message;
  }

  ngOnInit(): void {
    this.mailService.generateSession()
      .subscribe(session => { this.session = session; localStorage.setItem('session', session?.data?.introduceSession?.id); this.tempMail = session?.data?.introduceSession?.addresses?.[0]?.address })
  }
}
