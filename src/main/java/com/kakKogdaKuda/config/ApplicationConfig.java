package com.kakKogdaKuda.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

/**
 * Created by plutonii on 27.03.17.
 */
@Configuration
@PropertySources({@PropertySource("classpath:db.properties")})
@ComponentScan(basePackages = "com.kakKogdaKuda",
 excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE
         , value = {MVCConfig.class, WebConfig.class}))
public class ApplicationConfig {

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Value("${jdbc.driverClass}")
    private String driverClass;
    @Value("${jdbc.url}")
    private String jdbcUrl;
    @Value("${jdbc.username}")
    private String jdbcUserName;
    @Value("${jdbc.password}")
    private String jdbcPassword;

}
