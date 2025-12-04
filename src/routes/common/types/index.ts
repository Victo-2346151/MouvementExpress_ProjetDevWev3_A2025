import { Request, Response } from 'express';

export interface IReq<T = any> extends Request {
  body: T;
}

export interface IRes extends Response {}
