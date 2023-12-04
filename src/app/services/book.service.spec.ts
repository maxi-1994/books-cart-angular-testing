import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";

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

const book: Book = {
    name: '',
    author: '',
    isbn: '',
    price: 50,
    amount: 2,
};

describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;
    let storage = {};
    
    // Test configuration
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                BookService,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA,
            ],
        });
    });

    // Service instance
    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);

        storage = {};

        spyOn(localStorage, 'getItem').and.callFake((key: string) => {
            return storage[key] ? storage[key] : null;
        });

        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
            return storage[key] = value;
        });
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('Should create', () => {
        expect(service).toBeTruthy();
    });

    it('getBooks should return a list of book and does a get method', () => {
        service.getBooks().subscribe((res: Book[]) => {
            expect(res).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');

        req.flush(listBook);
    });

    it('getBooksFromCart should return an empty array when local is empty', () => {
        const bookList = service.getBooksFromCart();
        expect(bookList.length).toBe(0);
    });
    
    it('addBookToCart should add book to cart correctly when the list does not exist', () => {
        const toast = {
            fire: () => null,
        } as any;
        const spy1 = spyOn(Swal, 'mixin').and.callFake(() => {
            return toast;
        });

        let bookList = service.getBooksFromCart();
        expect(bookList.length).toBe(0);

        service.addBookToCart(book);
        bookList = service.getBooksFromCart();
        expect(bookList.length).toBe(1);

        expect(spy1).toHaveBeenCalled();
    });

    it('removeBooksFromCart should remove the list of cart from localstorage', () => {
        service.addBookToCart(book);

        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);

        service.removeBooksFromCart();

        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });
});