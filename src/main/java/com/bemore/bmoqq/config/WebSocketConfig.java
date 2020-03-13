package com.bemore.bmoqq.config;

import com.bemore.bmoqq.web.IndexController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import java.util.Map;

@Configuration
@EnableWebSocket // 启动websocket长连接
public class WebSocketConfig implements WebSocketConfigurer {
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(new IndexController(),"/chat")
                .addInterceptors(new HandshakeInterceptor() {
                    public boolean beforeHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
                        ServletServerHttpRequest request = (ServletServerHttpRequest)serverHttpRequest;
                        String username = request.getServletRequest().getParameter("username");
                        map.put("username", username);
                        return true;
                    }
                    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {

                    }
                });
    }
    @Bean
    public ServletServerContainerFactoryBean ServletServerContainerFactoryBean(){
        ServletServerContainerFactoryBean bean =
                new ServletServerContainerFactoryBean();
        bean.setMaxTextMessageBufferSize(1024*1024*3);//3M
        return bean;
    }

}
