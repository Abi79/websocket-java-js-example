package com.albertiordache.gradle.spring.starter.controller;

import org.springframework.messaging.Message;
import org.springframework.messaging.simp.annotation.SubscribeMapping;

@org.springframework.stereotype.Controller
public class Controller {
    /**
     * SubscribeMapping is similar to MessageMapping but narrows the mapping to subscription messages only.
     * It supports the same method arguments as MessageMapping. However, for the return value, by default, a message is sent
     * directly to the client (through clientOutboundChannel, in response to the subscription) and not to the broker
     * (through brokerChannel, as a broadcast to matching subscriptions).
     *
     * Adding @SendTo or @SendToUser overrides this behavior and sends to the broker instead.
     *
     * For communication with a specific user, check https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket-stomp-user-destination
     */
    @SubscribeMapping("/topic")
    public String subscribeMapping(Message<byte[]> message) {
        return "You are subscribed to /topic";
    }
}
