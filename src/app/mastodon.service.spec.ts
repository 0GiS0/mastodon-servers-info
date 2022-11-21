import { TestBed } from '@angular/core/testing';

import { MastodonService } from './mastodon.service';

describe('MastodonService', () => {
  let service: MastodonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MastodonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
