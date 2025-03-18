import { Main } from "@/components/layout/main";
import { columns } from "@/components/usersTable/users-columns";
import { UsersDialogs } from "@/components/usersTable/users-dialogs";
import { UsersPrimaryButtons } from "@/components/usersTable/users-primary-buttons";
import { UserTable } from "@/components/usersTable/users-table";
import UsersProvider from "./context/users-context";
import { users } from "./data/users";
import { userListSchema } from "./data/users-schema";

export default async function UsersTable() {
    const userList = await userListSchema.parse(users);

    return (
        <div className="h-full w-full px-4">
            <UsersProvider>
                <Main>
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                User List
                            </h2>
                            <p className="text-muted-foreground">
                                Manage your users and their roles here.
                            </p>
                        </div>
                        <UsersPrimaryButtons />
                    </div>
                    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <UserTable data={userList} columns={columns} />
                    </div>
                </Main>

                <UsersDialogs />
            </UsersProvider>
        </div>
    );
}
