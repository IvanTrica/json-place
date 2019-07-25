import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsService', () => {
  const test = [
    {
      userId: 1,
      id: 1,
      userName: null,
      title: '',
      body: ''
    },
    {
      userId: 1,
      id: 2,
      userName: null,
      title: '',
      body: ''
    }
  ];
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    }));

  it('should be created', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service).toBeTruthy();
  });

  it(`should be Equal Arrays`, () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service.getIds(test)).toEqual([1, 2]);
  });
});
