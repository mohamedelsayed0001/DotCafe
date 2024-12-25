package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Dto.ItemDto;
import com.example.Dotcafe.entity.Item;
import com.example.Dotcafe.repository.ItemRepository;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    private final ItemRepository itemRepository;

    public InventoryService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public ItemDto create(ItemDto itemDto) throws IllegalArgumentException {
        Optional<Item> searchItem = itemRepository.findByNameIgnoreCase(itemDto.getName());
        if (searchItem.isPresent()) {
            throw new IllegalArgumentException("Item with the same name already exists.");
        }
        Item newitem = itemRepository.save(itemDto.getItem());
        return newitem.getDto();
    }

    @SneakyThrows
    public ItemDto edit(ItemDto itemDto) throws IllegalArgumentException {
        Optional<Item> currentItem = itemRepository.findById(itemDto.getId());
        if (currentItem.isPresent()) {
            Optional<Item> otherItem = itemRepository.findByNameIgnoreCase(itemDto.getName());
            if (otherItem.isPresent() && !otherItem.get().getId().equals(itemDto.getId())) {
                throw new IllegalArgumentException("Another item with the same name already exists.");
            }

            Item finalitem = itemRepository.save(itemDto.getItem());
            return finalitem.getDto();
        } else {
            throw new IllegalArgumentException("Item with the given ID does not exist.");
        }
    }

    public void delete(Long id) {
        Optional<Item> pastItem = itemRepository.findById(id);
        if (pastItem.isPresent()) {
            itemRepository.deleteById(id);
        }
    }
    public List<ItemDto> getItems(){
        List <Item>  items = itemRepository.findAll();
        List<ItemDto> itemsDto = new ArrayList<>();
        for(Item item : items){
            itemsDto.add(item.getDto());
        }
        return itemsDto;
    }

}
