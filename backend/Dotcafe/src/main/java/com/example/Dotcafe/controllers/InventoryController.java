package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.ItemDto;
import com.example.Dotcafe.sevices.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/item")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {
    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }
    @PostMapping
    public ResponseEntity<?>create(@RequestBody ItemDto itemDto) {
        try{
            return new ResponseEntity<>(inventoryService.create(itemDto), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?>edit(@PathVariable Long id,@RequestBody ItemDto itemDto) {
        try{
            itemDto.setId(id);
            return new ResponseEntity<>(inventoryService.edit(itemDto), HttpStatus.OK);
        }  catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable  Long id) {
            inventoryService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<?> getItems(){
        return new ResponseEntity<>(inventoryService.getItems(),HttpStatus.OK);
    }

}
