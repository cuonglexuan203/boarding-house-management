package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Past(message = "Ensure birthdate is before the current date")
    @Column(name = "birthday", nullable = false)
    private Date birthday;

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @JsonDeserialize(converter = Address.AddressConverter.class)
    @Embedded
    private Address address;

    @NotBlank
    @Column(name = "career")
    private String career;

    @NotBlank
    @Size(min = 9, max = 20, message = "Identity number is required")
    @Column(name = "id_card_number", nullable = false, unique = true)
    private String idCardNumber;

    @NotBlank
    @Size(min = 9, max = 20, message = "Phone number must be 10 or 11 digits")
    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @NotBlank
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotBlank
    @Column(name = "password", nullable = false)
    private String password;

    // Relationships

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<RoomBooking> roomBookings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @ManyToOne
    private Role role;

    @ManyToMany
    @JoinTable(
            name = "user_permission",
            joinColumns = @JoinColumn(name = "user_fk"),
            inverseJoinColumns = @JoinColumn(name = "permission_fk")
    )
    private List<Permission> permissions;

    //


}
