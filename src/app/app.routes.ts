import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AdminGard, AuthGard, SellerGuard } from './service/auth.service';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { AdminDashboardComponent } from './dboards/admin/admin-dashboard/admin-dashboard.component';
import { AdminStaticsComponent } from './dboards/admin/admin-statics/admin-statics.component';
import { AdminMessagesComponent } from './dboards/admin/admin-messages/admin-messages.component';
import { AdminReportingComponent } from './dboards/admin/admin-reporting/admin-reporting.component';
import { AdminUsersComponent } from './dboards/admin/admin-users/admin-users.component';
import { SellerStaticsComponent } from './dboards/seller/seller-statics/seller-statics.component';
import { SellerMessagesComponent } from './dboards/seller/seller-messages/seller-messages.component';
import { SellerAddProductComponent } from './dboards/seller/seller-add-product/seller-add-product.component';
import { SellerOrdersComponent } from './dboards/seller/seller-orders/seller-orders.component';
import { SellerProductsComponent } from './dboards/seller/seller-products/seller-products.component';
import { SellerDashboardComponent } from './dboards/seller/seller-dashoard/seller-dashoard.component';
import { CartComponent } from './cart/cart/cart.component';
import { SellerAddCategoryComponent } from './dboards/seller/seller-add-category/seller-add-category.component';
import { BuyerDashboardComponent } from './dboards/buyer/buyer-dashboard/buyer-dashboard.component';
import { BuyerOrdersComponent } from './dboards/buyer/buyer-orders/buyer-orders.component';
import { BuyerStaticsComponent } from './dboards/buyer/buyer-statics/buyer-statics.component';

export const routes: Routes = [
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "products", component: ProductListComponent, },
    { path: "register/admin", component: RegisterAdminComponent },



    //auth
    { path: "profile", component: ProfileComponent, canActivate: [AuthGard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGard] },

    //admin
    {
        path: "admin/dashboard", component: AdminDashboardComponent, children: [
            {
                path: "",
                component: AdminStaticsComponent
            },
            {
                path: "messages",
                component: AdminMessagesComponent
            },
            {
                path: "reportings",
                component: AdminReportingComponent
            },
            {
                path: "users",
                component: AdminUsersComponent
            },
            {
                path: "addCategory",
                component: SellerAddCategoryComponent
            },
        ]
    },

    //seller

    {
        path: "seller/dashboard", component: SellerDashboardComponent, children: [
            {
                path: "",
                component: SellerStaticsComponent
            },
            {
                path: "messages",
                component: SellerMessagesComponent
            },
            {
                path: "addProducts",
                component: SellerAddProductComponent
            },

            {
                path: "orders",
                component: SellerOrdersComponent
            },
            {
                path: "products",
                component: SellerProductsComponent
            },
        ]
    },

    //buyer

    { path: "cart", component: CartComponent },
    {
        path: "buyer/dashboard", component: BuyerDashboardComponent, children: [
            {
                path: "",
                component: BuyerStaticsComponent
            },
            {
                path: "messages",
                component: SellerMessagesComponent
            },
            {
                path: "addProducts",
                component: SellerAddProductComponent
            },

            {
                path: "orders",
                component: BuyerOrdersComponent
            },
            {
                path: "products",
                component: SellerProductsComponent
            },
        ]
    },






    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/products' } // Wildcard route
];
