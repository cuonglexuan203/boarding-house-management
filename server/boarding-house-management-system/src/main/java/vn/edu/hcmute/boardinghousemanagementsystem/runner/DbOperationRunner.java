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

@Profile("cuongdev")
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
//
            int roomBooking_invoiceMaxIndex = Math.min(roomBookings.size(), invoices.size());
            for (int i = 0; i < roomBooking_invoiceMaxIndex; i++) {
                roomBookings.get(i).getInvoices().add(invoices.get(i));
                invoices.get(i).setRoomBooking(roomBookings.get(i));
            }
            //
            int roomBooking_roomMaxIndex = Math.min(roomBookings.size(), rooms.size());
            for (int i = 0; i < roomBooking_roomMaxIndex; i++) {
                roomBookings.get(i).setRoom(rooms.get(i));
                rooms.get(i).getRoomBookings().add(roomBookings.get(i));
            }
            //
            int roomBooking_contractMaxIndex = Math.min(roomBookings.size(), contracts.size());
            for (int i = 0; i < roomBooking_contractMaxIndex; i++) {
                roomBookings.get(i).setContract(contracts.get(i));
                contracts.get(i).setRoomBooking(roomBookings.get(i));
            }
//
//            for (int i = 0; i < invoices.size(); i++) {
//                Invoice invoice = invoices.get(i);
//                ServiceDetail serviceDetail = serviceDetails.get(i % serviceDetails.size());
//                invoice.getServiceDetails().add(serviceDetail);
//                serviceDetail.setInvoice(invoice);
//            }
            for(ServiceDetail serviceDetail : serviceDetails) {
                serviceDetail.setInvoice(invoices.get(0));
            }
            invoices.get(0).getServiceDetails().addAll(serviceDetails);
//
            int serviceDetail_serviceMaxIndex = Math.min(serviceDetails.size(), services.size());
            for (int i = 0; i < serviceDetail_serviceMaxIndex; i++) {
                serviceDetails.get(i).setService(services.get(i));
                services.get(i).getServiceDetails().add(serviceDetails.get(i));
            }
            // Room and service
            for(AccommodationService service: services) {
                for(Room room: rooms){
                    room.getServices().add(service);
                    service.getRooms().add(room);
                }
            }
            //
            roomBookingService.save(roomBookings);
            //
            int user_notificationMaxIndex = Math.min(users.size(), notifications.size());
            for (int i = 0; i < user_notificationMaxIndex; i++) {
                users.get(i).getNotifications().add(notifications.get(i));
                notifications.get(i).setUser(users.get(i));
            }
//
            int user_roomBookingsMaxIndex = Math.min(users.size(), roomBookings.size());
            for (int i = 0; i < user_roomBookingsMaxIndex; i++) {
                users.get(i).getRoomBookings().add(roomBookings.get(i));
                roomBookings.get(i).setUser(users.get(i));
            }
            //
                roleService.save(roles);
            //
//            for (int i = 0; i < users.size(); i++) {
//                User user = users.get(i);
//                Role role = roles.get(i % roles.size());
//                //
//                role.getUsers().add(user);
//                user.getRoles().add(role);
//            }
                userService.save(users);
            // Manually mapping user_role
            List<User> attachedUsers = userService.findAll();
            List<Role> attachedRoles = roleService.findAll();
            for (int i = 0; i < attachedUsers.size(); i++) {
                if(i == 0){
                    attachedUsers.getFirst().getRoles().add(attachedRoles.getFirst());
                    attachedRoles.getFirst().getUsers().add(attachedUsers.getFirst());
                }
                else if (i == 1) {
                    attachedUsers.get(1).getRoles().add(attachedRoles.get(1));
                    attachedRoles.get(1).getUsers().add(attachedUsers.get(1));
                }
                else {
                    attachedUsers.get(2).getRoles().add(attachedRoles.get(2));
                    attachedRoles.get(2).getUsers().add(attachedUsers.get(2));
                }
            }
            roleService.save(attachedRoles);
            //
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Read preloading data failed!");
        }
    }
}
