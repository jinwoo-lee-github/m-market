package com.market.userserver.service.dto;

import com.market.userserver.config.MessageType;
import lombok.Data;

@Data
public class Message {

    private MessageType type;
    private String senderId;
    private String senderName;
    private String content;

}
