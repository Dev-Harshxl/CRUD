package com.example.crud.repository;

import com.example.crud.entity.items;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<items, Long> {
}
// Repository