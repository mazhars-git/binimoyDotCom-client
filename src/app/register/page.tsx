import RegisterForm from "@/components/modules/auth/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-500">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
