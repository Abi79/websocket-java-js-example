package com.albertiordache.gradle.spring.starter.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
// See https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket-stomp
public class ServerWebSocketSockJsConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket") // This is what the client connects to first. Once this connection is established, STOMP frames begin to flow on it.
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // Use in-memory broker, as opposed to a dedicated broker
        config.setApplicationDestinationPrefixes("/app");
    }
}
