// types.ts
export interface Account {
  accountId: string;
  accountName: string;
  accountPassword: string;
  isActive: boolean;
  createAt: string;
}

export interface AccountCardProps {
  account: Account;
  updateAccount: (accountId: string, updatedAccount: Account) => void;
  removeAccount: (accountId: string) => void;
}
