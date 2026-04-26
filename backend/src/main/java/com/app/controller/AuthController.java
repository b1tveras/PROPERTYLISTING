package com.app.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.config.JwtUtil;
import com.app.model.User;
import com.app.repository.UserRepository;

import java.util.HashMap;

  
   

  
     
        @Autowired  
         private UserRepository userRep
        
           @Autowired 
            priva te JwtUtil jwtUtil; 
             
             @PostMappi ng("/login")
             public ResponseEntity<?> login(@
                 String email = body.ge
                 String password = body.g
     
        
   

  
     
                response.put("  
                  response.put("id", use 
                    return ResponseEntity.o  
     
       
         
        
          @PostMapping("/re
          public ResponseEnti
              S tring email = bod
              if  (userRepository.f
                  r eturn ResponseEntity.
              }
              User user = new User();
              user.setName(body.get("na
             user.setEmail(email);
           user.setPassword(body.get("pa
         userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("id", user.getId());
        return ResponseEntity.ok(response);
    }
}
