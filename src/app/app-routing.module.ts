import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SymbolsListComponent } from './components/symbols-list/symbols-list.component';
import { SymbolsUrlsResolver } from './resolvers/symbols-urls.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'symbols',
    pathMatch: 'full'
  },
  {
    path: 'symbols',
    component: SymbolsListComponent,
    resolve: {
      symbolsUrls: SymbolsUrlsResolver
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
