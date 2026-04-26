
package com.app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.model.Property;
import com.app.repository.PropertyRepository;
import java.util.*;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

 @Autowired
 private PropertyRepository propertyRepository;

 @GetMapping
 public List<Property> getAll(){
  return propertyRepository.findAll();
 }

 @GetMapping("/{id}")
 public ResponseEntity<Property> getById(@PathVariable Long id){
  return propertyRepository.findById(id)
   .map(ResponseEntity::ok)
   .orElse(ResponseEntity.notFound().build());
 }

 @PostMapping
 public Property create(@RequestBody Property property){
  return propertyRepository.save(property);
 }

 @PutMapping("/{id}")
 public ResponseEntity<Property> update(@PathVariable Long id, @RequestBody Property property){
  return propertyRepository.findById(id).map(existing -> {
   existing.setTitle(property.getTitle());
   existing.setLocation(property.getLocation());
   existing.setPrice(property.getPrice());
   existing.setDescription(property.getDescription());
   existing.setType(property.getType());
   existing.setBedrooms(property.getBedrooms());
   existing.setBathrooms(property.getBathrooms());
   existing.setArea(property.getArea());
   existing.setStatus(property.getStatus());
   existing.setImageUrl(property.getImageUrl());
   return ResponseEntity.ok(propertyRepository.save(existing));
  }).orElse(ResponseEntity.notFound().build());
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> delete(@PathVariable Long id){
  if(propertyRepository.existsById(id)){
   propertyRepository.deleteById(id);
   return ResponseEntity.ok().build();
  }
  return ResponseEntity.notFound().build();
 }
}
