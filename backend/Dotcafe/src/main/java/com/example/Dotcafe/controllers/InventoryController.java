package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.ItemDto;
import com.example.Dotcafe.entity.Item;
import com.example.Dotcafe.sevices.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/Admin/inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }
    @PostMapping ("/createitem")
    public ResponseEntity<?>create(@RequestBody ItemDto itemDto) {
        try{
            return new ResponseEntity<>(inventoryService.createitem(itemDto), HttpStatus.CREATED);
        } catch (CloneNotSupportedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("item already exists");
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
    @PutMapping("/edititem")
    public ResponseEntity<?>edit(@RequestBody ItemDto itemDto) {
        try{
            return new ResponseEntity<>(inventoryService.edititem(itemDto), HttpStatus.CREATED);
        }  catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item name already exists");

        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
    @DeleteMapping("/deleteitem/{id}")
    public ResponseEntity<?> delete(@PathVariable  Long id) {

            inventoryService.deleteitem(id);
            return new ResponseEntity<>(HttpStatus.OK);

    }
}
