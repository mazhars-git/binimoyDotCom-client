import RegisterForm from "@/components/modules/auth/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-500">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
