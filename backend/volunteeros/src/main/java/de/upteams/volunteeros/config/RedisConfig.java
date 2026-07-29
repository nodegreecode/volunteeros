package de.upteams.volunteeros.config;


import de.upteams.volunteeros.dto.project.ProjectResponseDto;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import org.springframework.data.redis.serializer.*;
import tools.jackson.databind.JavaType;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

import java.time.Duration;
import java.util.List;


@Configuration
@EnableCaching
public class RedisConfig {

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        return template;
    }

    @Bean
    RedisCacheManager cacheManager(
            RedisConnectionFactory connectionFactory) {

        ObjectMapper mapper = JsonMapper.builder()
                .findAndAddModules()
                .build();

        JavaType projectListType = mapper.getTypeFactory()
                .constructCollectionType(
                        List.class,
                        ProjectResponseDto.class
                );

        JacksonJsonRedisSerializer<List<ProjectResponseDto>> serializer =
                new JacksonJsonRedisSerializer<>(
                        projectListType
                );

        RedisCacheConfiguration config =
                RedisCacheConfiguration.defaultCacheConfig()
                        .serializeKeysWith(
                                RedisSerializationContext.SerializationPair
                                        .fromSerializer(new StringRedisSerializer())
                        )
                        .serializeValuesWith(
                                RedisSerializationContext.SerializationPair
                                        .fromSerializer(serializer)
                        )
                        .entryTtl(Duration.ofMinutes(10))
                        .disableCachingNullValues();


        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(config)
                .build();
    }
}