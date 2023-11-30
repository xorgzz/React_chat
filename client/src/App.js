import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./style.scss";

const socket = io.connect("http://localhost:3001");

function App() {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const clearBar = () => {
		document.getElementById("bar").value = "";
	};
	
	const sendMessage = () => {
		if (message.trim() !== "") {
			const newMessage = { text: message, sender: "me6" };
			socket.emit("sendMessage", newMessage);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setMessage("");
		}
	};

	useEffect(() => {
		socket.off("receiveMessage");
		socket.on("receiveMessage", (data) => {
			if (data.text && data.sender) {
				setMessages((prevMessages) => [...prevMessages, data]);
			}
		});
	}, []);

	return (
		<div className='App'>
			<div className='Box'>
				<div className="Messages">
					{messages.map((msg, index) => (
						<div className={`${msg.sender === "me6" ? "s" : "r"}`}>
							<div key={index} className={`${msg.sender === "me6" ? "Sent" : "Received"}`}>
								{msg.text}
							</div>
						</div>
					))}
				</div>
				<div className="Input">
					<input 
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								sendMessage();
								clearBar();
							}
						}}
					autoFocus="on" id="bar" 
						onChange={(event) => {
							setMessage(event.target.value);
						}}
						placeholder='Message...'
					/>
					<button onClick={() => {
						sendMessage();
						clearBar();
					}}>Send</button>
				</div>
			</div>
		</div>
	);
}

export default App;
