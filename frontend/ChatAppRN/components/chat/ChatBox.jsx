import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (!recipientUser) {
    return (
      <Text style={styles.centeredText}>
        No conversation selected yet...
      </Text>
    );
  }

  if (isMessagesLoading) {
    return <Text style={styles.centeredText}>Loading chats...</Text>;
  }

  return (
    <View style={styles.chatBox}>
      <Text style={styles.chatHeader}>
        <strong>{recipientUser?.name}</strong>
      </Text>
      <ScrollView ref={scrollRef} style={styles.messages}>
        {messages && messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.senderId === user?._id ? styles.messageSelf : styles.messageOther,
            ]}
          >
            <Text>{message.text}</Text>
            <Text style={styles.messageFooter}>
              {moment(message.createdAt).calendar()}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatInputContainer}>
        <TextInput
          value={textMessage}
          onChangeText={setTextMessage}
          style={styles.chatInput}
          placeholder="Type your message here..."
        />
        <TouchableOpacity onPress={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatBox: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centeredText: {
    textAlign: 'center',
    width: '100%',
  },
  messages: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  messageSelf: {
    backgroundColor: '#d1e7dd', // Example color for self
    alignSelf: 'flex-end',
  },
  messageOther: {
    backgroundColor: '#f8d7da', // Example color for others
    alignSelf: 'flex-start',
  },
  messageFooter: {
    fontSize: 12,
    color: '#aaa',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  chatInput: {
    flex: 1,
    borderColor: 'rgba(72,112,223,0.2)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff', // Link color
  },
});

export default ChatBox;
 