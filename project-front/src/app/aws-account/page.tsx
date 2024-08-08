"use client";
import Head from "next/head";
import styles from "./styles/page.module.css";
import AccountCard from "./components/account-card";
import { useState, useEffect } from "react";
import { Account } from "./types";
import axios from "axios";
import dayjs from "dayjs";

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAccount, setNewAccount] = useState<Account>({
    accountName: "",
    accountId: "",
    accountPassword: "",
    isActive: false,
    createAt: "", // 빈 문자열로 초기화
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8010/aws-account");
        const sortedAccounts = response.data.sort(
          (a: Account, b: Account) =>
            dayjs(a.createAt).valueOf() - dayjs(b.createAt).valueOf()
        );
        setAccounts(sortedAccounts);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    fetchAccounts();
  }, []);

  const updateAccount = (accountId: string, updatedAccount: Account) => {
    setAccounts(
      accounts.map((account) =>
        account.accountId === accountId ? updatedAccount : account
      )
    );
  };

  const removeAccount = (accountId: string) => {
    setAccounts(accounts.filter((account) => account.accountId !== accountId));
  };

  const handleAddClick = () => setIsAdding(true);

  const handleSaveClick = async () => {
    try {
      const response = await axios.post("http://localhost:8010/aws-account", {
        accountId: newAccount.accountId,
        accountPassword: newAccount.accountPassword,
        accountName: newAccount.accountName,
      });
      const addedAccount = response.data;
      setAccounts((prevAccounts) =>
        [...prevAccounts, addedAccount].sort(
          (a, b) => dayjs(a.createAt).valueOf() - dayjs(b.createAt).valueOf()
        )
      );
      setIsAdding(false);
      setNewAccount({
        accountName: "",
        accountId: "",
        accountPassword: "",
        isActive: false,
        createAt: "",
      });
    } catch (error) {
      console.error("Failed to add account", error);
    }
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewAccount({
      accountName: "",
      accountId: "",
      accountPassword: "",
      isActive: false,
      createAt: "",
    });
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
                  name="accountName"
                  value={newAccount.accountName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="accountId"
                  value={newAccount.accountId}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Account"
                />
                <input
                  type="password"
                  name="accountPassword"
                  value={newAccount.accountPassword}
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
              key={account.accountId}
              account={account}
              updateAccount={updateAccount}
              removeAccount={removeAccount}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
