import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrgPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
}
