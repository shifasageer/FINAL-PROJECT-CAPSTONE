package com.ust.menu.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.phone-number}")
    private String twilioPhoneNumber;

    public void sendSms(String toPhoneNumber, String messageBody) {
        Message.creator(
            new PhoneNumber(toPhoneNumber),
            new PhoneNumber(twilioPhoneNumber),
            messageBody
        ).create();
    }
}
