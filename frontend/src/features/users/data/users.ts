"use client";
import axiosInstance from "@/lib/axiosInstance";

// export const users = Array.from({ length: 20 }, () => {
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();

//     return {
//         id: faker.string.uuid(),
//         firstName,
//         lastName,
//         username: faker.internet
//             .username({ firstName, lastName })
//             .toLocaleLowerCase(),
//         email: faker.internet.email({ firstName }).toLocaleLowerCase(),
//         phoneNumber: faker.phone.number({ style: "international" }),
//         status: faker.helpers.arrayElement([
//             "active",
//             "inactive",
//             "invited",
//             "suspended",
//         ]),
//         role: faker.helpers.arrayElement([
//             "superadmin",
//             "admin",
//             "cashier",
//             "manager",
//         ]),
//         createdAt: faker.date.past(),
//         updatedAt: faker.date.recent(),
//     };
// });

export const users = async () => {
    try {
        const res = await axiosInstance.get("/User/listeUser");
        return res.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des utilisateurs :",
            error
        );
        throw error; // Tu peux aussi relancer l'erreur ou la gérer différemment
    }
};
