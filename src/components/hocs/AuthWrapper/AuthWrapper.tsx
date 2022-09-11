import { observer } from "mobx-react-lite";
import { ReactNode, useEffect, useRef } from "react";
import { useLoginUser } from "../../../utils/hooks/users/useLoginUser";

type AuthWrapperProps = {
  children: ReactNode;
};

export const AuthWrapper = observer((props: AuthWrapperProps) => {
  const { children } = props;
  const { checkIfIsLogged } = useLoginUser();

  const timerId = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // потому что запрос блокировал остальной рендер по какой-то причине...
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      checkIfIsLogged();
    }, 300);
  }, [checkIfIsLogged]);

  return children as JSX.Element;
});
