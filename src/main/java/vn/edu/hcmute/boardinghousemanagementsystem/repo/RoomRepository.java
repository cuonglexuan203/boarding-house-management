package vn.edu.hcmute.boardinghousemanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
