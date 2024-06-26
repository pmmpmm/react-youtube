import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "@/service/UserService";
import { UseLoginContext } from "@/context/LoginContext";
import ContentsLayoutBlock from "@/components/features/common/layouts/ContentsLayoutBlock";
import LogoIcon from "@/components/ui/LogoIcon";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

type InputsType = {
  [key: string]: string;
  email: string;
  password: string;
};

const LoginContent = () => {
  const { setIsLogin } = UseLoginContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  } as InputsType);

  const { email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") handleSubmit();
  };

  const handleSubmit = async () => {
    const response = await UserService.login(email, password);
    if (response) {
      alert("로그인에 성공하였습니다.");
      setIsLogin(true);
      // 로그인 성공 시 회원가입 페이지에서 진입한 경우 메인페이지로 이동, 그 외 경우 이전페이지로 이동
      if (state && state.prevPath === "/member/signup") {
        navigate("/");
      } else if (state === null) {
        navigate(-1);
      }
    } else {
      alert("로그인에 실패하였습니다.");
      setInputs({
        email: email,
        password: ""
      });
    }
  };

  return (
    <ContentsLayoutBlock>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="basis-1/2 pb-8 lg:pb-0">
          <div className="hidden mb-4 sm:block">
            <LogoIcon width="auto" height="2.75rem" />
          </div>
          <h1 className="text-3xl font-medium">로그인</h1>
        </div>
        <div className="basis-1/2">
          <div>
            <div className="flex flex-col gap-y-4">
              <TextField
                type="email"
                label="아이디"
                id="email"
                value={email}
                onChange={onChange}
                onKeyDown={handleKeyDown}
              />
              <TextField
                type="password"
                label="비밀번호"
                id="password"
                value={password}
                onChange={onChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button text="로그인" variant="contain" size="large" width="full" onClick={handleSubmit} />
              <Button text="회원가입" variant="outline" size="large" width="full" href="/member/signup" />
            </div>
          </div>
        </div>
      </div>
    </ContentsLayoutBlock>
  );
};

export default LoginContent;
