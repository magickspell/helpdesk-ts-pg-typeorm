import { Response } from 'express';
import { RequestStatus } from '../common.namespace';
import { processStatusRequest, validateDate } from './todo.helper';

/*
  тут приведен пример юнит тестов.

  есть еще интеграционные тесты в постмане, коллекцция лежит в корне:
    heldeskJS.postman_collection.json
*/

describe('processStatusRequest', () => {
  it('should respons status 200 and success, when affected > 0', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    processStatusRequest(res, 1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: RequestStatus.SUCCSESS, updated: 1 });
  });

  it('should respons status 400 and error, when affected === 0', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    processStatusRequest(res, 0);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: RequestStatus.ERRROR, updated: 0 });
  });
});

describe('validateDate', () => {
  it('should return true for a valid date format', () => {
    expect(validateDate('12.12.2022')).toBe(true);
  });

  it('should return false for an invalid date format (wrong length)', () => {
    expect(validateDate('12.12.22')).toBe(false);
  });

  it('should return false for an invalid date format (wrong separators)', () => {
    expect(validateDate('12-12-2022')).toBe(false);
  });

  it('should return false for an invalid date format (wrong number of dots)', () => {
    expect(validateDate('12.12.2022.')).toBe(false);
  });

  it('should return false for an invalid date format (not enough parts)', () => {
    expect(validateDate('12.12')).toBe(false);
  });

  it('should return false for an invalid date format (too many parts)', () => {
    expect(validateDate('12.12.2022.12')).toBe(false);
  });

  it('should return false for an invalid date format (non-numeric characters)', () => {
    expect(validateDate('12.ab.2022')).toBe(false);
  });
});
