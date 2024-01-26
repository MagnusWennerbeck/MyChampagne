import { TestBed } from '@angular/core/testing';

import { MySqlService } from './mysql.service';

describe('MysqlService', () => {
  let service: MySqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
