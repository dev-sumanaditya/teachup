import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { PanelComponent } from './panel/panel.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AuthService } from './auth/services/auth.service';

import { AuthGuard } from './helpers/auth.guard';
import { AntiAuthGuard } from './helpers/antiauth.guard';
import { CartState } from './store/states/cart.state';


@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxsModule.forFeature([CartState]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AntiAuthGuard,
    AuthService,
  ]
})
export class LandingModule { }
