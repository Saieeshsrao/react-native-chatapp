// import React, { useContext } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
// import { ChatContext } from "../../context/ChatContext";
// import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
// import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
// import moment from "moment";

// const UserChat = ({ chat, user }) => {
//   const { recipientUser } = useFetchRecipientUser(chat, user);
//   const { onlineUsers, notifications, markThisUserNotifications } = useContext(ChatContext);
//   const { latestMessage } = useFetchLatestMessage(chat);

//   const unreadNotifications = unreadNotificationsFunc(notifications);
//   const thisUserNotifications = unreadNotifications?.filter((n) => n.senderId === recipientUser?._id);
//   const isOnline = onlineUsers?.some((onlineUser) => onlineUser?.userId === recipientUser?._id);

//   const truncateText = (text) => {
//     let shortText = text.substring(0, 20);
//     if (text.length > 20) {
//       shortText = `${shortText}...`;
//     }
//     return shortText;
//   };

//   return (
//     <TouchableOpacity
//       style={styles.userCard}
//       onPress={() => {
//         if (thisUserNotifications?.length !== 0) {
//           markThisUserNotifications(thisUserNotifications, notifications);
//         }
//       }}
//     >
//       <View style={styles.userContent}>
//         <View style={styles.avatar}>
//           <Text>A</Text>
//         </View>
//         <View style={styles.textContent}>
//           <Text style={styles.name}>{recipientUser?.name}</Text>
//           {latestMessage?.text && (
//             <Text style={styles.text}>{truncateText(latestMessage?.text)}</Text>
//           )}
//         </View>
//       </View>
//       <View style={styles.notificationContent}>
//         <Text style={styles.date}>
//           {latestMessage?.createdAt ? moment(latestMessage?.createdAt).calendar() : ''}
//         </Text>
//         {thisUserNotifications?.length > 0 && (
//           <Text style={styles.notificationCount}>{thisUserNotifications.length}</Text>
//         )}
//         {isOnline && <View style={styles.onlineIndicator} />}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   userCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   userContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     marginRight: 10,
//     backgroundColor: "#ccc", // Placeholder for avatar
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//   },
//   textContent: {
//     flex: 1,
//   },
//   name: {
//     fontWeight: "bold",
//   },
//   text: {
//     color: "#555",
//   },
//   notificationContent: {
//     alignItems: "flex-end",
//     flexDirection: "column",
//   },
//   date: {
//     fontSize: 12,
//     color: "#888",
//   },
//   notificationCount: {
//     backgroundColor: "#ff0000",
//     color: "#fff",
//     borderRadius: 10,
//     padding: 2,
//     marginVertical: 2,
//   },
//   onlineIndicator: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "green",
//   },
// });
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user, onPress }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotifications } = useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter((n) => n.senderId === recipientUser?._id);
  const isOnline = onlineUsers?.some((onlineUser) => onlineUser?.userId === recipientUser?._id);

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = `${shortText}...`;
    }
    return shortText;
  };

  return (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotifications(thisUserNotifications, notifications);
        }
        onPress();
      }}
    >
      <View style={styles.userContent}>
        <View style={styles.avatar}>
          {console.log("recipientUser ")}
          <Text>{recipientUser?.name ? recipientUser.name[0] : "A"}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.name}>{recipientUser?.name || "Unknown User"}</Text>
          {latestMessage?.text && (
            <Text style={styles.text}>{truncateText(latestMessage?.text)}</Text>
          )}
        </View>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.date}>
          {latestMessage?.createdAt ? moment(latestMessage?.createdAt).calendar() : ''}
        </Text>
        {thisUserNotifications?.length > 0 && (
          <Text style={styles.notificationCount}>{thisUserNotifications.length}</Text>
        )}
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
    backgroundColor: "#ccc",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textContent: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    color: "black",
  },
  notificationContent: {
    alignItems: "flex-end",
    flexDirection: "column",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  notificationCount: {
    backgroundColor: "#ff0000",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    fontSize: 12,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginTop: 4,
  },
});

export default UserChat;
