package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "updated_date", nullable = false)
    private Date updatedDate;

    @Column(name = "disappear_date", nullable = false)
    private Date disappearDate;

    @Column(name = "visibility")
    private boolean visibility;

    // Relationships

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private User user;


}
