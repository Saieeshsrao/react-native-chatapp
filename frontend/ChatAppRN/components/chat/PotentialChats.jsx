import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <View style={styles.allUsers}>
      {potentialChats &&
        potentialChats.map((u, index) => (
          <TouchableOpacity
            key={index}
            style={styles.singleUser}
            onPress={() => createChat(user._id, u._id)}
          >
            <Text style={styles.userName}>{u.name}</Text>
            {onlineUsers?.some((onlineUser) => onlineUser?.userId === u?._id) && (
              <View style={styles.onlineIndicator} />
            )}
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  allUsers: {
    padding: 10,
    backgroundColor: "#fff",
  },
  singleUser: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userName: {
    flex: 1,
    fontSize: 16,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green", // Example color for online users
  },
});

export default PotentialChats;
