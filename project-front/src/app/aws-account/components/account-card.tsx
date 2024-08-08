import { useEffect, useRef, useState } from "react";
import styles from "../styles/account-card.module.css";
import { AccountCardProps } from "../types";
import { MouseEvent } from "react";
import axios from "axios";

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  updateAccount,
  removeAccount,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState({ ...account });
  const [isActive, setIsActive] = useState(account.isActive || false); // 초기 활성화 상태 설정
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef.current]);

  const updateActiveStatus = async (newIsActive: boolean) => {
    try {
      await axios.patch(
        `http://localhost:8010/aws-account/${account.accountId}/activate`,
        {
          isActive: newIsActive,
        }
      );
      updateAccount(account.accountId, { ...account, isActive: newIsActive });
    } catch (error) {
      console.error("Failed to update account active status", error);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      await axios.patch(
        `http://localhost:8010/aws-account/${account.accountId}`,
        {
          accountName: editedAccount.accountName,
          accountId: editedAccount.accountId,
          accountPassword: editedAccount.accountPassword,
        }
      );
      updateAccount(account.accountId, editedAccount);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update account", error);
    }
  };

  const handleCancelClick = () => {
    setEditedAccount({ ...account });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `http://localhost:8010/aws-account/${account.accountId}`
      );
      removeAccount(account.accountId);
    } catch (error) {
      console.error("Failed to delete account", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAccount({ ...editedAccount, [name]: value });
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    setCurrentX(moveX);
    if (moveX < -cardWidth / 6) {
      if (!isActive) {
        setIsActive(true);
        updateActiveStatus(true);
      }
    } else {
      if (isActive) {
        setIsActive(false);
        updateActiveStatus(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentX(0);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ transform: `translateX(${currentX}px)` }}
    >
      <div className={styles.cardContent}>
        {!isEditing && <h2>{account.accountName}</h2>}
        {isEditing && (
          <>
            <input
              type="text"
              name="accountName"
              value={editedAccount.accountName}
              onChange={handleChange}
              className={styles.input}
            />
            {!isActive && (
              <>
                <input
                  type="text"
                  name="accountId"
                  value={editedAccount.accountId}
                  onChange={handleChange}
                  className={styles.input}
                />
                <input
                  type="password"
                  name="accountPassword"
                  value={editedAccount.accountPassword}
                  onChange={handleChange}
                  className={styles.input}
                />
              </>
            )}
          </>
        )}
        {!isEditing && !isActive && (
          <>
            <p>
              <strong>Account Id:</strong> {account.accountId}
            </p>
            <p>
              <strong>Password:</strong>
              {"".padEnd(account.accountPassword.length, "*")}
            </p>
          </>
        )}
      </div>
      {!isActive && (
        <div className={styles.buttonContainer}>
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className={styles.saveButton}>
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick} className={styles.editButton}>
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountCard;
