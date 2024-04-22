import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Messages = db.define("messages", {
  chat_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^(G|D)_/,
        msg: "chat_id must start with G or D",
      },
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Messages;
