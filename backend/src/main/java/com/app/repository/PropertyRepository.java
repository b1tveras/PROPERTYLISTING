
package com.app.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.Property;

public interface PropertyRepository extends JpaRepository<Property,Long>{
}
