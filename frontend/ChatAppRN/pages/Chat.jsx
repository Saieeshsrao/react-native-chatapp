import React, { useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Container } from "native-base"; // or any other UI library you're using
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import { ChatContext } from "../context/ChatContext";

// const Chat = () => {
//     const { user } = useContext(AuthContext);
//     const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

//     return (
//         <Container style={styles.container}>
//             <Text>Chats</Text>
//             <PotentialChats />
//             {userChats?.length < 1 ? null : (
//                 <View style={styles.chatContainer}>
//                     <View style={styles.messagesBox}>
//                         {isUserChatsLoading && <ActivityIndicator size="large" color="#0000ff" />}
//                         {userChats?.map((chat, index) => (
//                             <UserChat key={index} chat={chat} user={user} onPress={() => updateCurrentChat(chat)} />
//                         ))}
//                     </View>
//                     <ChatBox />
//                 </View>
//             )}
//         </Container>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     chatContainer: {
//         flexDirection: "row",
//         flex: 1,
//     },
//     messagesBox: {
//         flex: 1,
//         paddingRight: 16,
//     },
// });

// export default Chat;


const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

    return (
        <Container style={styles.container}>
            <Text>Chats</Text>
            <PotentialChats />
            {userChats?.length < 1 ? null : (
                <View style={styles.chatContainer}>
                    <View style={styles.messagesBox}>
                        {isUserChatsLoading && <ActivityIndicator size="large" color="#0000ff" />}
                        {userChats?.map((chat, index) => (
                            <UserChat
                                key={index}
                                chat={chat}
                                user={user}
                                onPress={() => updateCurrentChat(chat)}
                            />
                        ))}
                    </View>
                    {/* <ChatBox /> */}
                </View>
            )}
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    chatContainer: {
        flexDirection: "row",
        flex: 1,
    },
    messagesBox: {
        flex: 1,
        paddingRight: 16,
    },
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
        color: "#555",
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
export default Chat;