import {useEffect, useState} from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
    Button, MessageSeparator
} from '@chatscope/chat-ui-kit-react';
import {Form} from "./Components/Form";


const API_KEY = process.env.REACT_APP_API_KEY;

export const system = {
    "role": "system", "content": "Je suis un diéthétitient virtuel, je peux vous aider à trouver des recettes, " +
        "des conseils nutritionnels et des informations sur les aliments" +
        "Si l on te pose des question sur un domaine ne concernant pas la nutrition tu ne connais par la réponse  " +
        "ne répond pas au question concernant la science, la politique, la religion, la sexualité, la finance, le sport" +
        "ne prend pas en compte ma demande si mon IMC est dans une zone critique et informe moi du danger de mon objectif" +
        "adapte les informations sur mon profil"
}

function App() {
    //trigger pour le formulaire
    const [isFormFufilled, setIsFormFufilled] = useState(false)

    //modification du système pour ajuster les informations de l'utilisateur
    const [systemMessage, setSystemMessage] = useState(system)
    const modifySystemMessage = (sexe, age, taille, poid, nbEntrainement, objectif) => {
        const currentSystem = systemMessage.content + " mon profile je suis un" + sexe + "de" + age + "ans, je mesure" + taille + "cm et je pèse" + poid + "kg. " +
            "je m entrainne" + nbEntrainement + "fois par semaine je souhaite " + objectif

        setSystemMessage({
            ...system, content: currentSystem
        })
    }


    //initiation du premier message
    const [messages, setMessages] = useState([
        {
            message: "Bonjour, je suis votre coach nutrition comment puis-je vous aider!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);

    //gestion du load de l'API
    const [isTyping, setIsTyping] = useState(false);

    const handleUserMessage = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };
        //ajout du message user à la liste
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setIsTyping(true);
        //Interrogation de l'API avec les messages
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        //redefinition des roles
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return {role: role, content: messageObject.message}
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "temperature": 0.7,
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
            return data.json();
        }).then((data) => {
            //ajout de la reponse de l'API à la liste
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
        });
    }

    const handleUserProfileModification = () => {
        setSystemMessage(system)
        setIsFormFufilled(false)
        clearChat()
    }
    const clearChat = () => {
        setMessages([messages[0]]);
    }
    return (
        <div className="App-header">
            {isFormFufilled ?
                <div style={{position: "relative", height: "700px", width: "700px"}}>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={isTyping ?
                                    <TypingIndicator content="Votre coach se renseigne"/> : null}
                            >
                                {messages.map((message, id) => {
                                    return <Message key={id} model={message}></Message>
                                })}
                            </MessageList>
                            <MessageInput placeholder="Type message here" onSend={handleUserMessage}/>

                        </ChatContainer>
                    </MainContainer>
                    <Button onClick={clearChat}>Clear Chat</Button>
                    <Button onClick={handleUserProfileModification}>Modifier les informations</Button>
                </div> : <Form setIsFormFufilled={setIsFormFufilled} modifySystem={modifySystemMessage}/>}
        </div>
    )
}

export default App
