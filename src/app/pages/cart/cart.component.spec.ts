import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CartComponent } from "./cart.component";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { By } from "@angular/platform-browser";
  
const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7,
    }
];

describe('Cart component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    // Test configuration
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [
                CartComponent,
            ],
            providers: [
                BookService,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA,
            ]
        }).compileComponents(); 
    });


    // Component instance
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(BookService);

        fixture.detectChanges();

        spyOn(service, 'getBooksFromCart').and.callFake(() => null);
    });

    // tests
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getTotalPrice should return an amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    });

    it('onInputNumberChange should increment correctly', () => {
        const action = 'plus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2,
        };

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount === 2).toBeTrue();

        component.onInputNumberChange(action, book);

        expect(book.amount === 3).toBeTrue();
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('onInputNumberChange should decrement correctly', () => {
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 20,
            amount: 4,
        };

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(4);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(3);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });
    
    it('onClearBooks should work correctly', () => {
        const spy = spyOn((component as any), '_clearListCartBook').and.callThrough();
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

        component.listCartBook = listBook;
        component.onClearBooks();

        expect(component.listCartBook.length).toBe(0);
        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('The title "The cart is empty" is not displayed when there is a list of book', () => {
        component.listCartBook = listBook;
        fixture.detectChanges();

        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        
        expect(debugElement).toBeFalsy();
    });

    it('The title "The cart is empty" is displayd correctly when list is empty', () => {
        component.listCartBook = [];
        fixture.detectChanges();
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeTruthy();

        if(debugElement) {
            const element: HTMLElement = debugElement.nativeElement;
            expect(element.innerHTML).toContain('The cart is empty');
        }
    });

});