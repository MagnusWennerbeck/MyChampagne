// auth.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService], // Lägg till AuthService och AuthGuard som providers här
})
export class AuthModule {}
