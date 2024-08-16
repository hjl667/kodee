package com.example.cai_app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private ResourceLoader resourceLoader;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/build/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        if (resourcePath.startsWith("/api/")) return null;

                        // Only load files (i.e., resource paths ending with a file extension)
                        if (resourcePath.lastIndexOf('.') > resourcePath.lastIndexOf('/')) {
                            Resource requestedResource = resourceLoader.getResource("classpath:/build/" + resourcePath);
                            if (requestedResource.exists() && requestedResource.isReadable()) {
                                return requestedResource;
                            }
                        }

                        return resourceLoader.getResource("classpath:/build/index.html");
                    }
                });
    }
}
