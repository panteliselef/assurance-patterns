async function assertAssurance<T extends object>(
  fetcher: () => Promise<Response>
) {
  let result = (await (await fetcher()).json()) as T;

  while ("clerk_error" in result && "reason" in result) {
    let creds = prompt("Verify your credentials");

    while (creds == null || creds == "") {
      creds = prompt("Verify your credentials");
    }

    // <UserVerification /> calls FAPI
    await fetch("/fapi/verify", {
      method: "POST",
    });

    result = await (await fetcher()).json();
  }

  return result;
}

function assertAssuranceHandler<T extends object>(
  fetcher: () => Promise<Response>
) {
  return async () => {
    return await assertAssurance<T>(fetcher);
  };
}

// async function openUserVerification({
//   afterVerification,
// }: {
//   afterVerification: () => void;
// }) {
//   let creds = prompt("Verify your credentials");

//   while (creds == null || creds == "") {
//     creds = prompt("Verify your credentials");
//   }

//   // <UserVerification /> calls FAPI
//   await fetch("/fapi/verify", {
//     method: "POST",
//   });
// }

export { assertAssurance, assertAssuranceHandler };
