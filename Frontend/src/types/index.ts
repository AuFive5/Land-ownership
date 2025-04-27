import type { BaseAddress, Value } from '@emurgo/cardano-serialization-lib-browser';

export interface Land {
  id: string;
  owner: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  area: number;
  propertyType: 'residential' | 'commercial' | 'agricultural';
  price: number;
  documents: Document[];
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'deed' | 'survey' | 'tax' | 'identity' | 'other';
  url: string;
  uploadedAt: string;
}

export interface User {
  id: string;
  walletAddress: string;
  name?: string;
  email?: string;
  role: 'user' | 'admin' | 'verifier';
  createdAt: string;
}

export interface Transaction {
  id: string;
  landId: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  timestamp: string;
}

export interface WalletInfo {
  address: string;
  balance: string;
  connected: boolean;
  network: string;
}

export type ProviderType = 'nami' | 'eternl' | null;

export interface CardanoWallet {
  getUsedAddresses(): Promise<string[]>;
  getBalance(): Promise<string>;
  getNetworkId(): Promise<number>;
  signTx(tx: any): Promise<any>;
  submitTx(tx: any): Promise<string>;
  getUtxos(): Promise<any[]>;
  getCollateral(): Promise<any[]>;
}

export interface CardanoApi {
  enable(): Promise<CardanoWallet>;
}