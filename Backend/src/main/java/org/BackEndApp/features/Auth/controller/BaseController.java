package org.BackEndApp.features.Auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class BaseController {

    @GetMapping("/")
    public Map<String, String> baseUrl() {
        return Map.of(
                "status", "✅ UP",
                "message", "🚀 API is running & ready to serve requests!"
        );
    }

}
