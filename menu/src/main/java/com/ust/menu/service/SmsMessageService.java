package com.ust.menu.service;

import org.springframework.stereotype.Service;

@Service
public class SmsMessageService {

    private String messageBody = "This is an emergency message. Please respond immediately."; // Default message

    // Method to get the current message body
    public String getMessageBody() {
        return messageBody;
    }

    // Method to update the message body
    public void updateMessageBody(String newMessageBody) {
        this.messageBody = newMessageBody;
    }
}
