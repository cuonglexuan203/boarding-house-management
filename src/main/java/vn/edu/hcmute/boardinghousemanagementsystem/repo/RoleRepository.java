package vn.edu.hcmute.boardinghousemanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
