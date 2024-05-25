package vn.edu.hcmute.boardinghousemanagementsystem.runner;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.*;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingProcessContext;
import vn.edu.hcmute.boardinghousemanagementsystem.service.*;

import java.util.List;
import java.util.stream.Stream;

@Profile("initdata")
@Order(1)
@Slf4j
@RequiredArgsConstructor
@Component
public class DbOperationRunner implements CommandLineRunner {
    @NotNull
    private final UserService userService;

    @NotNull
    private final RoleService roleService;

    @NotNull
    private final PermissionService permissionService;

    @NotNull
    private final AccommodationServiceService accommodationServiceService;

    @NotNull
    private final ContractService contractService;

    @NotNull
    private final InvoiceService invoiceService;

    @NotNull
    private final NotificationService notificationService;

    @NotNull
    private final RoomBookingService roomBookingService;

    @NotNull
    private final ServiceDetailService serviceDetailService;

    @NotNull
    private final RoomService roomService;

    //

    @NotNull
    private final PasswordEncoder passwordEncoder;

    //
    @Value("classpath:data/users.json")
    private Resource userResource;

    @Value("classpath:data/roles.json")
    private Resource roleResource;

    @Value("classpath:data/permissions.json")
    private Resource permissionResource;

    @Value("classpath:data/services.json")
    private Resource serviceResource;

    @Value("classpath:data/contracts.json")
    private Resource contractResource;

    @Value("classpath:data/invoices.json")
    private Resource invoiceResource;

    @Value("classpath:data/notifications.json")
    private Resource notificationResource;

    @Value("classpath:data/room_bookings.json")
    private Resource roomBookingResource;

    @Value("classpath:data/service_details.json")
    private Resource serviceDetailResource;

    @Value("classpath:data/rooms.json")
    private Resource roomResource;

    //
    private List<User> users;
    private List<Role> roles;
    private List<Permission> permissions;
    private List<AccommodationService> services;
    private List<Contract> contracts;
    private List<Invoice> invoices;
    private List<Notification> notifications;
    private List<RoomBooking> roomBookings;
    private List<ServiceDetail> serviceDetails;
    private List<Room> rooms;

    @Override
    public void run(String... args) throws Exception {
        try {
            Stream<Resource> resourceStream = Stream.of(userResource, roleResource, permissionResource,
                    serviceResource, contractResource, invoiceResource, notificationResource,
                    roomBookingResource, serviceDetailResource, roomResource);
            // Deserialization
            resourceStream.map(res -> {
                        DeserializingProcessContext ctx = new DeserializingProcessContext();
                        ctx.deserialize(res);
                        return ctx.getContextValue();
                    })
                    .forEach(objectArr -> {
                        if (objectArr instanceof User[] userArr) {
                            users = List.of(userArr);
                        } else if (objectArr instanceof Role[] roleArr) {
                            roles = List.of(roleArr);
                        } else if (objectArr instanceof Permission[] permissionArr) {
                            permissions = List.of(permissionArr);
                        } else if (objectArr instanceof AccommodationService[] serviceArr) {
                            services = List.of(serviceArr);
                        } else if (objectArr instanceof Contract[] contractArr) {
                            contracts = List.of(contractArr);
                        } else if (objectArr instanceof Invoice[] invoiceArr) {
                            invoices = List.of(invoiceArr);
                        } else if (objectArr instanceof Notification[] notificationArr) {
                            notifications = List.of(notificationArr);
                        } else if (objectArr instanceof RoomBooking[] roomBookingArr) {
                            roomBookings = List.of(roomBookingArr);
                        } else if (objectArr instanceof ServiceDetail[] serviceDetailArr) {
                            serviceDetails = List.of(serviceDetailArr);
                        } else if (objectArr instanceof Room[] roomArr) {
                            rooms = List.of(roomArr);
                        }
                    });
            // Checking null values
            if (users == null) {
                log.error("No users");
                return;
            }
            if (roles == null) {
                log.error("No roles");
                return;
            }
            if (permissions == null) {
                log.error("No permissions");
                return;
            }
            if (services == null) {
                log.error("No services");
                return;
            }
            if (contracts == null) {
                log.error("No contracts");
                return;
            }
            if (invoices == null) {
                log.error("No invoices");
                return;
            }
            if (notifications == null) {
                log.error("No notifications");
                return;
            }
            if (roomBookings == null) {
                log.error("No roomBookings");
                return;
            }
            if (serviceDetails == null) {
                log.error("No serviceDetails");
                return;
            }
            if (rooms == null) {
                log.error("No rooms");
                return;
            }
            // Persistence
            // Mapping
            roleService.save(roles);
            permissionService.save(permissions);
//          role & permission
            roles.get(0).addPermission(permissions.get(2));
            roles.get(0).addPermission(permissions.get(3));
            roles.get(1).addPermission(permissions.get(1));
            roles.get(2).addPermission(permissions.get(0));
//
            notificationService.save(notifications);
            userService.save(users);
//          user & role
            users.get(0).addRole(roles.get(0));
            users.get(1).addRole(roles.get(1));
            users.get(2).addRole(roles.get(1));
            for (int i = 3; i < users.size(); i++) {
                users.get(i).addRole(roles.get(2));
            }
//          user & notification
            int user_notification_minIdx = Math.min(users.size(), notifications.size());
            for (int i = 0; i < user_notification_minIdx; i++) {
                users.get(i).addNotification(notifications.get(i));
            }
            userService.save(users);
//
            accommodationServiceService.save(services);
            serviceDetailService.save(serviceDetails);
//           service & service detail
            int servicesSize = services.size();
            int servicesIdx = 0;
            for (int i = 0; i < serviceDetails.size(); i++) {
                if (servicesIdx >= servicesSize) {
                    servicesIdx = 0;
                }
                services.get(servicesIdx++).addServiceDetail(serviceDetails.get(i));
            }
//          service detail & invoice
            invoiceService.save(invoices);
            int invoicesSize = invoices.size();
            int invoiceIdx = 0;
            for (int i = 0; i < serviceDetails.size(); i++) {
                if (invoiceIdx >= invoicesSize) {
                    invoiceIdx = 0;
                }
                invoices.get(invoiceIdx++).addServiceDetail(serviceDetails.get(i));
            }
            invoiceService.save(invoices);
            //
//          room & service
            roomService.save(rooms);
            servicesIdx = 0;
            for (int i = 0; i < rooms.size(); i++) {
                if (servicesIdx >= servicesSize) {
                    servicesIdx = 0;
                }
                rooms.get(i).addService(services.get(servicesIdx++));
            }
            roomService.save(rooms);
//
//          room booking & invoice
            int roomBookingsSize = roomBookings.size();
            int roomBookingsIdx = 0;
            for (int i = 0; i < invoicesSize; i++) {
                roomBookings.get(roomBookingsIdx++).addInvoice(invoices.get(i));
            }
//          room & room booking
            int roomsSize = rooms.size();
            int roomsIdx = 0;
            for (int i = 0; i < roomBookings.size(); i++) {
                if (roomsIdx >= roomsSize) {
                    roomsIdx = 0;
                }
                rooms.get(roomsIdx++).addRoomBooking(roomBookings.get(i));
            }
            //
//          room booking & contract
            int contractsSize = contracts.size();
            int contractsIdx = 0;
            for (int i = 0; i < roomBookings.size(); i++) {
                if (contractsIdx >= contractsSize) {
                    contractsIdx = 0;
                }
                contracts.get(contractsIdx++).addRoomBooking(roomBookings.get(i));
            }
            roomBookingService.save(roomBookings);
//
//          room booking & user & contract
            roomBookingsIdx = 0;
            contractsIdx = 0;
            boolean canSetContractRepresentation = true;
            for (int i = 0; i < users.size(); i++) {
                User user = users.get(i);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                if (roomBookingsIdx >= roomBookingsSize) {
                    roomBookingsIdx = 0;
                }
                if (contractsIdx >= contractsSize) {
                    canSetContractRepresentation = false;
                }
                roomBookings.get(roomBookingsIdx++).addUser(user);
                if (canSetContractRepresentation) {
                    contracts.get(contractsIdx++).addContractRepresentation(user);
                }
            }
            userService.save(users);

            //
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Read preloading data failed!");
        }
    }
}
