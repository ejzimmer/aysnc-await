import { ReviewController } from '../review';

describe('Review Controller', () => {
  let controller;

  const IdentityServiceMock = {
    provideIdentityDetails: () => ({}),
    provideAllEvidence: () => ({}),
  };

  beforeEach(() => {
    controller = new ReviewController(IdentityServiceMock);
    controller.form = {
      $valid: true,
    };
  });

  it('should call the identity service to verify the evidence', async (done) => {
    await controller.verify();
    expect(IdentityServiceMock.provideAllEvidence).toHaveBeenCalled();
    done();
  });
});

class Test {
  async get something() {
    return 'la';
  }
}