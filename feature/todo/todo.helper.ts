import { Response } from 'express';
import { RequestStatus } from '../common.namespace';

export function processStatusRequest(res: Response, affected: number) {
  if (affected > 0) {
    res.status(200).json({ status: RequestStatus.SUCCSESS, updated: affected });
    return;
  }
  res.status(400).json({ status: RequestStatus.ERRROR, updated: affected });
}