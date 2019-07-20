import {Component, OnInit} from '@angular/core';
import {TranslateService} from '../service/translate.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  selectedLanguage: string;

  COOKIE_LANG = 'pogo_friend_finder_lang';

  constructor(private translate: TranslateService, private cookieService: CookieService) {
    const lang = cookieService.get(this.COOKIE_LANG);
    if (lang) {
      this.useLang(lang);
    } else if (navigator.language.includes('hu')) {
      this.setLang('hu');
    } else {
      this.setLang('en');
    }
  }

  setLang(lang: string) {
    this.cookieService.set(this.COOKIE_LANG, lang);
    this.useLang(lang);
  }

  useLang(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang)
      .catch(reason => console.log(reason));
  }

  ngOnInit() {
  }

}
