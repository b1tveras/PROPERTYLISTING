
package com.app.model;
import jakarta.persistence.*;

@Entity
public class Property {
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String title;
 private String location;
 private double price;
 private String description;
 private String type;
 private int bedrooms;
 private int bathrooms;
 private double area;
 private String status;
 private String imageUrl;

 public Property() {}

 public Long getId() { return id; }
 public void setId(Long id) { this.id = id; }
 public String getTitle() { return title; }
 public void setTitle(String title) { this.title = title; }
 public String getLocation() { return location; }
 public void setLocation(String location) { this.location = location; }
 public double getPrice() { return price; }
 public void setPrice(double price) { this.price = price; }
 public String getDescription() { return description; }
 public void setDescription(String description) { this.description = description; }
 public String getType() { return type; }
 public void setType(String type) { this.type = type; }
 public int getBedrooms() { return bedrooms; }
 public void setBedrooms(int bedrooms) { this.bedrooms = bedrooms; }
 public int getBathrooms() { return bathrooms; }
 public void setBathrooms(int bathrooms) { this.bathrooms = bathrooms; }
 public double getArea() { return area; }
 public void setArea(double area) { this.area = area; }
 public String getStatus() { return status; }
 public void setStatus(String status) { this.status = status; }
 public String getImageUrl() { return imageUrl; }
 public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
