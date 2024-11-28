package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StickerRepository extends JpaRepository<Sticker, Integer> {
}
