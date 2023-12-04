import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/compiler";
import { FormComponent } from "./form.component"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Form component', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    // Test configuration
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [
                FormComponent,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA,
            ],
        }).compileComponents();
    });

    // Component instance
    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Tests
    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Name field is required', () => {
        const nameField = component.form.get('name');
        nameField.setValue('');
        expect(nameField.valid).toBeFalse();
    });

    it('Name field has an error with more than 5 characters', () => {
        const nameField = component.form.get('name');
        nameField.setValue('Test name');
        expect(nameField.valid).toBeFalse();
    });

    it('Name field is correct with less than 5 characters', () => {
        const nameField = component.form.get('name');
        nameField.setValue('Test');
        expect(nameField.valid).toBeTrue();
    });


    it('email field is required', () => {
        const emailField = component.form.get('email');
        emailField.setValue('');
        expect(emailField.valid).toBeFalse();
    });

    it('email must be valid', () => {
        const emailField = component.form.get('email');
        emailField.setValue('test@');
        expect(emailField.valid).toBeFalse();

        emailField.setValue('test@test.com');
        expect(emailField.valid).toBeTrue();
    });

    it('form is valid', () => {
        const nameField = component.form.get('name');
        const emailField = component.form.get('email');
        
        nameField.setValue('Joe');
        emailField.setValue('joe@email.com');

        expect(component.form.valid).toBeTrue();
    });
})