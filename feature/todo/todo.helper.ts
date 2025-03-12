import { Response } from 'express';
import { RequestStatus } from '../common.namespace';

export function processStatusRequest(res: Response, affected: number) {
  if (affected > 0) {
    res.status(200).json({ status: RequestStatus.SUCCSESS, updated: affected });
    return;
  }
  res.status(400).json({ status: RequestStatus.ERRROR, updated: affected });
}

export function validateDate(date: string): boolean {
  try {
    const nums: string[] = date.split(".");
    const chars: string[] = date.split("");

    const nans: boolean = nums.some(n => isNaN(Number(n)));

    if (
      date.length !== 10
      || nans
      || chars.filter(char => char === ".").length !== 2
      || nums.length !== 3
      || nums[0].length !== 2 || nums[1].length !== 2 || nums[2].length !== 4
    ) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}