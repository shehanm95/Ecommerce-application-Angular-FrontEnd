import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AdminGard, AuthGard } from './service/auth.service';

export const routes: Routes = [
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "products", component: ProductListComponent, },

    { path: "profile", component: ProfileComponent, canActivate: [AuthGard] },


    { path: "users", component: UserListComponent, canActivate: [AdminGard] },


    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/products' } // Wildcard route
];
