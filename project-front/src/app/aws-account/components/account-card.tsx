// components/AccountCard.js
import { useEffect, useRef, useState } from "react";
import styles from "../styles/account-card.module.css";
import { AccountCardProps } from "../types";
import { MouseEvent } from "react";

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  updateAccount,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState({ ...account });
  const [isActive, setIsActive] = useState(false);
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

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    updateAccount(account.id, editedAccount);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedAccount({ ...account });
    setIsEditing(false);
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
    if (moveX < -cardWidth / 4) {
      setIsActive(true);
    } else {
      setIsActive(false);
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
        <h2>{account.name}</h2>
        {!isActive && isEditing && (
          <>
            <input
              type="text"
              name="name"
              value={editedAccount.name}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="text"
              name="account"
              value={editedAccount.account}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              value={editedAccount.password}
              onChange={handleChange}
              className={styles.input}
            />
          </>
        )}
        {!isActive && !isEditing && (
          <>
            <p>
              <strong>Account:</strong> {account.account}
            </p>
            <p>
              <strong>Password:</strong> {"***"}
            </p>
          </>
        )}
      </div>
      <div className={styles.buttonContainer}>
        {!isActive && isEditing && (
          <>
            <button onClick={handleSaveClick} className={styles.saveButton}>
              Save
            </button>
            <button onClick={handleCancelClick} className={styles.cancelButton}>
              Cancel
            </button>
          </>
        )}
        {!isActive && !isEditing && (
          <button onClick={handleEditClick} className={styles.editButton}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountCard;
