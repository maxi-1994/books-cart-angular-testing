import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { NavComponent } from "./nav.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";

class ComponentTestRoute {}

describe('nav component', () => {

    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: ComponentTestRoute },
                    { path: 'cart', component: ComponentTestRoute },
                ]),
            ],
            declarations: [
                NavComponent,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA,
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should navigate', () => {
        const router = TestBed.inject(Router);

        const spy = spyOn(router, 'navigate');

        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);

        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });

});