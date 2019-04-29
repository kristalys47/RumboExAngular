import { StudentNumPipe } from './student-num.pipe';

describe('StudentNumPipe', () => {
  it('create an instance', () => {
    const pipe = new StudentNumPipe();
    expect(pipe).toBeTruthy();
  });
});
