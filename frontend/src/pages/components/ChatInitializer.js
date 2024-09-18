import React, { useEffect } from "react";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

const COMETCHAT_CONSTANTS = {
  APP_ID: "26382062b7007bfc", // Replace with your App ID
  REGION: "in", // Replace with your App Region
  AUTH_KEY: "04c0af6cba5bcbaeeb191f9ed5e32763a43c3e7e", // Replace with your Auth Key
};

const UID = "cometchat-uid-1"; // Replace with your user UID

const ChatInitializer = () => {
  useEffect(() => {
    // Create the builder for UIKitSettings
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      .build();

    // Initialize CometChat UI Kit
    CometChatUIKit.init(UIKitSettings)
      .then(() => {
        console.log("Initialization completed successfully");

        // Check if a user is already logged in
        CometChatUIKit.getLoggedinUser().then((user) => {
          if (!user) {
            // Login user if not logged in
            CometChatUIKit.login(UID)
              .then((user) => {
                console.log("Login Successful:", { user });
                // mount your app here (e.g., load the chat component)
              })
              .catch(console.log);
          } else {
            // User is already logged in, mount your app
            console.log("User already logged in:", user);
            // mount your app here (e.g., load the chat component)
          }
        });
      })
      .catch(console.log);
  }, []); // Empty dependency array to run once on mount

  return <div>CometChat Initialized</div>;
};

export default ChatInitializer;
