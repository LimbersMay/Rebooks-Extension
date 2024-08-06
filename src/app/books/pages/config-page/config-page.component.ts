import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styles: ``
})
export class ConfigPageComponent{

  public languages: Language[] = [
    {name: 'English', code: 'en'}
  ]

  public configFormGroup = new FormGroup({
    language: new FormControl({value: 'Hello', disabled: true}),
  })

}
