import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _spinnerdisplay: Boolean = false;

  constructor() { }

  displayspinner(): void {
    this._spinnerdisplay = true;
  }

  get spinnerdisplay(): Boolean {
    return this._spinnerdisplay;
  }

  hidespinner(): void {
    this._spinnerdisplay = false;
  }
}
