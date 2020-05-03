import { PipesModule } from './pipes.module';

describe('PipesModule', () => {
  it('create an instance', () => {
    const pipe = new PipesModule();
    expect(pipe).toBeTruthy();
  });
});
