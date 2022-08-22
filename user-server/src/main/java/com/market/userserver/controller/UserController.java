package com.market.userserver.controller;

import com.market.userserver.config.MessageType;
import com.market.userserver.service.dto.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class UserController {

    @MessageMapping("/join")
    @SendTo("/topic/chatRoomId")
    public Message join(Message message) {
        message.setType(MessageType.JOIN);
        message.setContent(HtmlUtils.htmlEscape(message.getContent()));
        return message;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chatRoomId")
    public Message chat(Message message) {
        message.setType(MessageType.CHAT);
        message.setContent(HtmlUtils.htmlEscape(message.getContent()));
        return message;
    }

}
