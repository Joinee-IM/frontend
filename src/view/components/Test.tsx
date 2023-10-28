import { useLogin } from '@/modules/auth/service';

export default function Users() {
  //   const {
  //     data: users,
  //     isLoading,
  //     error,
  //     invalidate: invalidateUsers, // zodios also provides invalidation helpers
  //   } = zodiosHooks.useQuery("/users"); // or useGetUsers();
  const { mutate } = useLogin(); // or .useCreateUser(...);

  return (
    <>
      <h1>Users</h1>
      <button
        onClick={() =>
          mutate(
            { username: 'john doe', password: '123' },
            {
              onSettled(data, error) {
                console.log(data, error);
              },
            },
          )
        }
      >
        add user
      </button>
    </>
  );
}
