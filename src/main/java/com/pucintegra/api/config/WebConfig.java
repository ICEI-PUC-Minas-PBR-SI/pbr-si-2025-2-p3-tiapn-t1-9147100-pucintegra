package com.pucintegra.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                // EM VEZ DE ASTERISCO, COLOCAMOS O LINK DIRETO:
                .allowedOrigins("https://puc-integra-22codp8d3-gabriel-gr1s-projects.vercel.app", "http://localhost:3000") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        // Quando acessar a raiz, redireciona para o index.html
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Serve arquivos estáticos (HTML, CSS, JS) de dentro da pasta static
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");

        // Serve uploads
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("classpath:/static/uploads/");
    }
}
