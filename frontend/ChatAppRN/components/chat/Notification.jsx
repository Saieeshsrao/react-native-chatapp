import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  return (
    <View style={styles.notificationsContainer}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.notificationsIcon}>
        <Text style={styles.icon}>💬</Text>
        {unreadNotifications.length > 0 && (
          <View style={styles.notificationCount}>
            <Text style={styles.countText}>{unreadNotifications.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.notificationsBox}>
          <View style={styles.notificationsHeader}>
            <Text style={styles.headerText}>Notifications</Text>
            <TouchableOpacity onPress={() => markAllNotificationsAsRead(notifications)}>
              <Text style={styles.markAsRead}>Mark all as read</Text>
            </TouchableOpacity>

            {modifiedNotifications.length === 0 && (
              <Text style={styles.noNotifications}>No notifications yet</Text>
            )}

            {modifiedNotifications.map((n, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.notification, !n.isRead && styles.notRead]}
                onPress={() => {
                  markNotificationAsRead(n, userChats, user, notifications);
                  setIsOpen(false);
                }}
              >
                <Text>{`${n.senderName}: sent you a message`}</Text>
                <Text style={styles.notificationTime}>{moment(n.date).calendar()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainer: {
    position: 'relative',
  },
  notificationsIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  notificationCount: {
    backgroundColor: '#ff3d00', // Example red color for the count
    borderRadius: 10,
    padding: 5,
    marginLeft: 5,
  },
  countText: {
    color: '#fff',
  },
  notificationsBox: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 5, // For shadow effect on Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  notificationsHeader: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  markAsRead: {
    color: '#007bff', // Link color
    marginBottom: 10,
  },
  noNotifications: {
    color: '#666',
  },
  notification: {
    paddingVertical: 10,
  },
  notRead: {
    backgroundColor: '#f0f8ff', // Light background for unread notifications
  },
  notificationTime: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default Notification;
