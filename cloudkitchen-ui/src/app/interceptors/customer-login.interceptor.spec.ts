import { TestBed } from '@angular/core/testing';

import { CustomerLoginInterceptor } from './customer-login.interceptor';

describe('CustomerLoginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomerLoginInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomerLoginInterceptor = TestBed.inject(CustomerLoginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
