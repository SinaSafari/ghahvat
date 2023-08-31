export default function AdminSingleProfile({
  params,
}: {
  params: { profileId: string };
}) {
  return <div>{params.profileId}</div>;
}
