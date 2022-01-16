package com.albertiordache.gradle.spring.starter.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class WsService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Scheduled(fixedDelay = 10000)
    public void scheduledTask() {
        log.info(">>> Sending message");
        simpMessagingTemplate.convertAndSend("/topic", "test123");
    }
}
