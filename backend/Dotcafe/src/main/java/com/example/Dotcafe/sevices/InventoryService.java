package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Dto.ItemDto;
import com.example.Dotcafe.entity.Item;
import com.example.Dotcafe.repository.ItemRepository;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InventoryService {
    private final ItemRepository itemRepository;

    public InventoryService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public ItemDto createitem(ItemDto itemDto) throws CloneNotSupportedException {
        Optional<Item> searchitem = itemRepository.getitembyname(itemDto.getName());
        if (searchitem.isPresent()) {
            throw new CloneNotSupportedException("Item with the same name already exists.");
        }
        Item newitem = itemRepository.save(itemDto.getitem());
        return newitem.getitemDto();
    }

    @SneakyThrows
    public ItemDto edititem(ItemDto itemDto) throws IllegalArgumentException {
        Optional<Item> currentitem = itemRepository.findById(itemDto.getId());
        if (currentitem.isPresent()) {
            Optional<Item> otheritem = itemRepository.getitembyname(itemDto.getName());
            if (otheritem.isPresent() && !otheritem.get().getId().equals(itemDto.getId())) {
                throw new IllegalArgumentException("Another item with the same name already exists.");
            }

            Item finalitem = itemRepository.save(itemDto.getitem());
            return finalitem.getitemDto();
        } else {
            throw new IllegalArgumentException("Item with the given ID does not exist.");
        }
    }

    public ItemDto deleteitem(ItemDto itemDto) {
        Optional<Item> pastItem = itemRepository.getitembyname(itemDto.getName());
        if (pastItem.isPresent()) {
            throw new IllegalArgumentException();
        }
        itemDto.setId(null);
        Item Finalitem = itemRepository.save(itemDto.getitem());
        return Finalitem.getitemDto();

    }
}
