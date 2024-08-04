"use client";
// pages/index.js
import Head from "next/head";
import styles from "./styles/page.module.css";
import AccountCard from "./components/account-card";
import { useState } from "react";
import { Account } from "./types";

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: "John Doe", account: "john_doe", password: "password123" },
    {
      id: 2,
      name: "Jane Smith",
      account: "jane_smith",
      password: "password456",
    },
    {
      id: 3,
      name: "Bob Johnson",
      account: "bob_johnson",
      password: "password789",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAccount, setNewAccount] = useState<Account>({
    id: 0,
    name: "",
    account: "",
    password: "",
  });

  const updateAccount = (id: number, updatedAccount: Account) => {
    setAccounts(
      accounts.map((account) => (account.id === id ? updatedAccount : account))
    );
  };

  const handleAddClick = () => setIsAdding(true);

  const handleSaveClick = () => {
    const accountUpdate = { ...newAccount };
    accountUpdate.id = accounts.length + 1;
    setAccounts([...accounts, accountUpdate]);
    setIsAdding(false);
    setNewAccount({ id: 0, name: "", account: "", password: "" });
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewAccount({ id: 0, name: "", account: "", password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Account Cards Layout</title>
        <meta
          name="description"
          content="Account cards layout with empty space on the left"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.emptySpace}></div>
        <div className={styles.cardContainer}>
          <div className={styles.addCard}>
            {isAdding ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={newAccount.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="account"
                  value={newAccount.account}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Account"
                />
                <input
                  type="password"
                  name="password"
                  value={newAccount.password}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Password"
                />
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handleSaveClick}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <button onClick={handleAddClick} className={styles.addButton}>
                <span className={styles.addIcon}>+</span>
              </button>
            )}
          </div>
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              updateAccount={updateAccount}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
