/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import {sliceUuid} from '../helpers';

it('returns 7 characters', () => {
  expect(sliceUuid('12345678')).toEqual('1234567');
});

it('returns all if fewer than 7', () => {
  expect(sliceUuid('12345')).toEqual('12345');
});
