import React from 'react';
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow
} from 'react-chat-engine-advanced';
// import Header from '@/components/customHeader';
// import StandardMessageForm from '@/components/customMessageForms/StandardMessageForm';
// import Ai from '@/components/customMessageForms/Ai';
// import AiCode from '@/components/customMessageForms/AiCode';
// import AiAssist from '@/components/customMessageForms/AiAssist';
import CustomHeader from '../customHeader';
import StandardMessageForm from '../customMessageForms/StandardMessageForm';
import Ai from '../customMessageForms/Ai';
import AiCode from '../customMessageForms/AiCode';
import AiAssist from '../customMessageForms/AiAssist';

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    process.env.REACT_APP_PROJECT_ID,
    'testUser',
    '123456'
  );

  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={chat => <CustomHeader chat={chat} />}
        renderMessageForm={props => {
          if (chatProps.chat?.title.startsWith('AiChat_')) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith('AiCode_')) {
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith('AiAssist_')) {
            return <AiAssist props={props} activeChat={chatProps.chat} />;
          }

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
