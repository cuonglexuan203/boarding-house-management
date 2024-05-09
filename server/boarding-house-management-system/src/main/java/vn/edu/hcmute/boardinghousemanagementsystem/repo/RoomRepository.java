package vn.edu.hcmute.boardinghousemanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    void deleteById(Long id);
}
