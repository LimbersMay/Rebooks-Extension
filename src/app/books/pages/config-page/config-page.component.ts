import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DropdownChangeEvent} from "primeng/dropdown";
import {TranslocoService} from "@jsverse/transloco";

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent implements OnInit {

  public translocoService = inject(TranslocoService);

  public languages: Language[] = [
    {name: 'English', code: 'en'},
    {name: 'Frech', code: 'fr'},
  ]

  public configFormGroup = new FormGroup({
    language: new FormControl<Language>(this.languages[0])
  })

  public onSelectLanguage(language: DropdownChangeEvent): void {
    this.translocoService.setActiveLang(language.value.code);
  }

  public ngOnInit() {
    const selectedLanguage = this.languages.find(lang => lang.code == this.translocoService.getActiveLang());

    if (selectedLanguage)
      this.configFormGroup.get('language')?.setValue(selectedLanguage);
  }
}
