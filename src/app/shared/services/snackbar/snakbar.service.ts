import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export enum MatSnackBarType {
  error = 'error',
  info = 'info',
  success = 'success',
}
@Injectable({
  providedIn: 'root'
})
export class SnakbarService {

  snackBarConfig: MatSnackBarConfig | undefined;
  snackBarRef: MatSnackBarRef<any> | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  snackBarAutoHide = '2000';

  constructor(private snackBar: MatSnackBar) { }

  showSnakBar(message: string, type: MatSnackBarType, secounds: number = 2000) {
    this.snackBarConfig = new MatSnackBarConfig();

    if (type === 'success') {
      this.snackBarConfig.panelClass = ['success-snackbar'];
    } else if (type === 'error') {
      this.snackBarConfig.panelClass = ['error-snackbar'];
    } else {
      this.snackBarConfig.panelClass = ['info-snackbar'];
    }
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = secounds
    return this.snackBar.open(message, 'x', this.snackBarConfig);
  }

}
