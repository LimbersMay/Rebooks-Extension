import {
  provideTransloco,
  TranslocoModule
} from '@jsverse/transloco';
import { isDevMode, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
import {provideTranslocoPersistLang} from "@jsverse/transloco-persist-lang";


@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    provideTranslocoPersistLang({
      storage: {
        useValue: localStorage
      }
    }),
      provideTransloco({
        config: {
          availableLangs: ['en', 'fr'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ],
})
export class TranslocoRootModule {}
