import { TestBed } from '@angular/core/testing';

import { UserResolverService } from './user-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UserResolverService]
  }));

  it('should be created', () => {
    const service: UserResolverService = TestBed.get(UserResolverService);
    expect(service).toBeTruthy();
  });
});
