package com.example.crud.controller;

import com.example.crud.entity.items;
import com.example.crud.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    // logging.level.org.springframework=DEBUG

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Map<String, Object>> getAllItems() {
        List<items> items = itemRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();
        for (items item : items) {
            Map<String, Object> itemMap = new HashMap<>();
            itemMap.put("id", item.getId());
            itemMap.put("title", item.getTitle());
            itemMap.put("description", item.getDescription());

            if (item.getImage() != null) {
                // Detect MIME type
                String mimeType = item.getImage()[0] == (byte) 0x89 ? "image/png" : "image/jpeg";
                String base64Image = "data:" + mimeType + ";base64,"
                        + Base64.getEncoder().encodeToString(item.getImage());
                itemMap.put("image", base64Image);
            } else {
                itemMap.put("image", null);
            }

            response.add(itemMap);
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createItem(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            byte[] imageBytes = processImage(image);
            items newItem = new items(title, description, imageBytes);
            itemRepository.save(newItem);
            return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing image: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    private byte[] processImage(MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            System.out.println("Received image: " + image.getOriginalFilename());
            return image.getBytes();
        }
        return null;
    }

}
