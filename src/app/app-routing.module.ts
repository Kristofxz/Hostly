import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { StayResolver } from './services/stay.resolver';
import { StayIndexComponent } from './pages/stay-index/stay-index.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { EditStayComponent } from './cmps/edit-stay/edit-stay.component';
import { UserTripsComponent } from './cmps/user-trips/user-trips.component';
import { UserOrderComponent } from './cmps/user-order/user-order.component';
import { UserStaysComponent } from './cmps/user-stays/user-stays.component';
import { UserWishlistComponent } from './cmps/user-wishlist/user-wishlist.component';
const routes: Routes = [
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard], children: [
      { path: 'edit/:id', component: EditStayComponent },
      { path: 'edit', component: EditStayComponent },
      { path: 'trips', component: UserTripsComponent },
      { path: 'orders', component: UserOrderComponent },
      { path: 'stays', component: UserStaysComponent },
      { path: 'wishlist', component: UserWishlistComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: ':stayId',
    loadChildren: () => import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule),
    resolve: { stay: StayResolver },
  },
  { path: '', component: StayIndexComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled', anchorScrolling: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
