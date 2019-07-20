import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {QRCodeModule} from 'angularx-qrcode';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/firestore';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {NavComponent} from './nav/nav.component';
import {SearchComponent} from './search/search.component';
import {DataService} from './service/data.service';
import {TranslateService} from './service/translate.service';
import {TranslatePipe} from './service/translate.pipe';
import {AppSettingsService} from './service/app-settings.service';
import {TrainerFormComponent} from './trainer-form/trainer-form.component';
import {QrModalComponent} from './qr-modal/qr-modal.component';
import {ContactComponent} from './contact/contact.component';
import {CookieService} from 'ngx-cookie-service';

export function setupTranslateFactory(
  service: TranslateService): Function {
  if (navigator.language.includes('hu')) {
    return () => service.use('hu');
  } else {
    return () => service.use('en');
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    TrainerFormComponent,
    QrModalComponent,
    TranslatePipe,
    ContactComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    QRCodeModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonToggleModule,
  ],
  entryComponents: [QrModalComponent],
  providers: [AngularFirestore, DataService, TranslateService, AppSettingsService, CookieService, {
    provide: APP_INITIALIZER,
    useFactory: setupTranslateFactory,
    deps: [TranslateService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
