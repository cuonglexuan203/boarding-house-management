package vn.edu.hcmute.boardinghousemanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import vn.edu.hcmute.boardinghousemanagementsystem.util.enums.Gender;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private LocalDate birthday;

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
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
    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "users", cascade = CascadeType.MERGE)
    private List<RoomBooking> roomBookings = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private List<Role> roles = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "user_permission",
            joinColumns = @JoinColumn(name = "user_fk"),
            inverseJoinColumns = @JoinColumn(name = "permission_fk")
    )
    private List<Permission> permissions = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "contractRepresentation", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private List<Contract> contracts = new ArrayList<>();

    //
    public void addRole(Role role) {
        role.getUsers().add(this);
        this.roles.add(role);
    }

    public void removeRole(Role role) {
        role.getUsers().remove(this);
        this.roles.remove(role);
    }

    public void addNotification(Notification notification) {
        notification.setUser(this);
        this.notifications.add(notification);
    }

    public void removeNotification(Notification notification) {
        notification.setUser(null);
        this.notifications.remove(notification);
    }

    public void addRoomBooking(RoomBooking roomBooking) {
        roomBooking.getUsers().add(this);
        this.getRoomBookings().add(roomBooking);
    }

    public void removeRoomBooking(RoomBooking roomBooking) {
        roomBooking.getUsers().remove(null);
        this.getRoomBookings().remove(roomBooking);
    }

    public void addContract(Contract contract) {
        contract.setContractRepresentation(this);
        this.contracts.add(contract);
    }

    public void removeContract(Contract contract) {
        contract.setContractRepresentation(null);
        this.contracts.remove(contract);
    }

}
