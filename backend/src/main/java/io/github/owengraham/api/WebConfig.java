package io.github.owengraham.api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        System.out.println("Configuring resource handlers for /data/uploads/**");
        logger.info("Configuring resource handlers for /data/uploads/**");
        registry.addResourceHandler("/data/uploads/**")
                .addResourceLocations("file:data/uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        logger.info("Configuring CORS mappings for /data/uploads/**");
        registry.addMapping("/data/uploads/**")
                .allowedOrigins("http://localhost:3000", "http://192.168.1.151:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}