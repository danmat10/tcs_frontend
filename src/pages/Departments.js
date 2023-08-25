import { Breadcrumb, PageContainer } from "components/Common";
import PageGridContent from "components/Common/PageGridContent.component";
import { DepartmentsBreadcrumb } from "components/Departments";
import { Header } from "components/Header";

const DepartmentsPage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Departamentos">
          <DepartmentsBreadcrumb />
        </Breadcrumb>
        <PageGridContent></PageGridContent>
      </PageContainer>
    </>
  );
};

export default DepartmentsPage;
