import { useLogin } from '@/modules/auth/service';

export default function Users() {
  //   const {
  //     data: users,
  //     isLoading,
  //     error,
  //     invalidate: invalidateUsers, // zodios also provides invalidation helpers
  //   } = zodiosHooks.useQuery("/users"); // or useGetUsers();
  const { mutate, data } = useLogin(); // or .useCreateUser(...);

  return (
    <>
      <div>{data?.data?.account_id ?? 'lichi'}</div>
      <button
        onClick={() =>
          mutate(
            { email: 'b09705017@ntu.im', password: 'string' },
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
