package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.config.JwtUtil;
import com.app.model.User;
import com.app.repository.UserRepository;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    String password = body.get("password");
    User user = userRepository.findByEmail(email);
    if (user != null && user.getPassword().equals(password)) {
      String token = jwtUtil.generateToken(user.getEmail());
      Map<String, Object> response = new HashMap<>();
      response.put("token", token);
      response.put("name", user.getName());
      response.put("email", user.getEmail());
      response.put("id", user.getId());
      return ResponseEntity.ok(response);
    }
    return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    if (userRepository.findByEmail(email) != null) {
      return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
    }
    User user = new User();
    user.setName(body.get("name"));
    user.setEmail(email);
    user.setPassword(body.get("password"));
    userRepository.save(user);
    String token = jwtUtil.generateToken(user.getEmail());
    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("name", user.getName());
    response.put("email", user.getEmail());
    response.put("id", user.getId());
    return ResponseEntity.ok(response);
  }}

  
  
     
    
    
    
    
    
  
 

 

