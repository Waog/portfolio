import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { ProofOfConceptWorkerService } from './proof-of-concept-worker.service';

describe('ProofOfConceptWorkerService', () => {
  let service: ProofOfConceptWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofOfConceptWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('run (sync fallback — Worker unavailable in Jest)', () => {
    it('should return { result: "X" } for input "X"', async () => {
      expect(await firstValueFrom(service.run('X'))).toEqual({ result: 'X' });
    });

    it('should return { result: "hello" } for input "hello"', async () => {
      expect(await firstValueFrom(service.run('hello'))).toEqual({
        result: 'hello',
      });
    });
  });
});
