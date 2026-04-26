
package com.app.controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

 @GetMapping("/")
 public String home(){
  return "Advanced Property App API is running!";
 }
}
