package vn.edu.hcmute.boardinghousemanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
