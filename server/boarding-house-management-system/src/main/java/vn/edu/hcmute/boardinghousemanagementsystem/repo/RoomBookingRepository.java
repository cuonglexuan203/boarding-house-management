package vn.edu.hcmute.boardinghousemanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.RoomBooking;

@Repository
public interface RoomBookingRepository extends JpaRepository<RoomBooking, Long> {
}
