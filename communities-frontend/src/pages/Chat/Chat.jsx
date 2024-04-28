import React, { useState } from "react";
import styles from "./Chat.module.css"; // Import CSS module
import Header from "../../components/Header/Header"; // Import Header component
import Sidebar from "../../components/Sidebar/Sidebar"; // Import Sidebar component
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState({});

  const userID = 1;
  let chatClass = "";
  const users = [
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
  ];

  const messsages = [
    { senderid: 1, receiverid: 2, message: "Hello" },
    { senderid: 2, receiverid: 1, message: "Hi" },
    { senderid: 1, receiverid: 2, message: "How are you?" },
    { senderid: 2, receiverid: 1, message: "I am good, how about you?" },
    { senderid: 1, receiverid: 2, message: "I am good too" },
    { senderid: 2, receiverid: 1, message: "That's great" },
    { senderid: 3, receiverid: 1, message: "Hello" },
    { senderid: 1, receiverid: 3, message: "Hi" },
    { senderid: 3, receiverid: 1, message: "How are you?" },
    { senderid: 1, receiverid: 3, message: "I am good, how about you?" },
    { senderid: 3, receiverid: 1, message: "I am good too" },
    { senderid: 1, receiverid: 3, message: "That's great" },
  ];

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    // Load chat messages for the selected user
    // setChatMessages({ userId: [messages] });
  };

  return (
    <div className={styles.CommunityPage}>
      <Header className={styles.navbar} />
      <div className={styles.body}>
        <Sidebar className={styles.Sidebar} />
        <div className={styles.box1}>
          <div className={styles["chat-app-container"]}>
            <div className={styles["user-list"]}>
              <h2>Users</h2>
              <ul>
                {users.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    className={styles["user-item"]}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles["chat-messages"]}>
              {selectedUser ? (
                <div>
                  <h2>
                    Chat with{" "}
                    {users.find((user) => user.id === selectedUser)?.name}
                  </h2>
                  <ul className={styles["message-list"]}>
                    {messsages
                      .filter(
                        (message) =>
                          (message.senderid === selectedUser &&
                            message.receiverid === userID) ||
                          (message.senderid === userID &&
                            message.receiverid === selectedUser)
                      )
                      .map(
                        (message, index) => (
                          (chatClass =
                            message.senderid === userID ? "sent" : "received"),
                          (
                            <li key={index} className={styles[chatClass]}>
                              <div className={styles.dm}>{message.message}</div>
                            </li>
                          )
                        )
                      )}
                  </ul>
                </div>
              ) : (
                <div>
                  <h2>Select a user to start chatting</h2>
                </div>
              )}

              <div className={styles["message-input"]}>
                <input type="text" placeholder="Type a message" />
                <button>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
