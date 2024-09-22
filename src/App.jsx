import { Route, Routes } from 'react-router-dom'
import './App.css'
import Contacts from './Contacts'
import ContactDetails from './ContactDetails'
import SendMessage from './SendMessage'
import MessagesList from './MessagesList'

function App() {

  return (
    <Routes>
        <Route path="" element={ <Contacts/> } />
        <Route path="contact/:id" element={ <ContactDetails/> } />
        <Route path="send-message/:id" element={ <SendMessage/> } />
        <Route path="message-list" element={ <MessagesList/> } />
      </Routes>
  )
}

export default App
