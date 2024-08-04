// types.ts
export interface Account {
  id: number;
  name: string;
  account: string;
  password: string;
}

export interface AccountCardProps {
  account: Account;
  updateAccount: (id: number, updatedAccount: Account) => void;
}
