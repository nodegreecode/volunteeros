package de.upteams.volunteeros.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisService {

    private static final String REFRESH_PREFIX = "refresh:";

    private final RedisTemplate<String, String> redisTemplate;

    public RedisService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(String email, String refreshToken, Duration ttl) {
        redisTemplate.opsForValue().set(REFRESH_PREFIX + email, refreshToken, ttl);
    }

    public String find(String email) {
        return redisTemplate.opsForValue().get(REFRESH_PREFIX + email);
    }

    public void delete(String email) {
        redisTemplate.delete(REFRESH_PREFIX + email);
    }
}
