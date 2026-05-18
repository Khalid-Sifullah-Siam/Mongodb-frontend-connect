import AddUserModal from "../Components/AddUserModal";
import UsersTable from "../Components/UsersTable";
import { createUser, deleteUser } from "../lib/actions";
import { getUsers } from "../lib/data";


const UsersPage = async () => {

    const users = await getUsers();

    return (
        <div>


            <div className="flex justify-between">
            <h2>User Management : {users.length}</h2>
            <AddUserModal createUserAction={createUser} />
            </div>


            <UsersTable users={users} deleteUserAction={deleteUser} />
        </div>
    );
};

export default UsersPage;