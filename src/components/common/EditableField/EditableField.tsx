import {
  HTMLChakraProps,
  Editable,
  EditableInputProps,
  EditableTextareaProps,
  useDisclosure,
  EditablePreview,
  Text,
  EditableInput,
  EditableTextarea,
} from "@chakra-ui/react";
import { ReactNode, useRef, useState } from "react";
import { Grave } from "../../../types/Grave";
import { IUserProfile } from "../../../types/User";
import { Alert } from "../Modal/Alert/Alert";

type EditableFieldProps<T> = {
  as: HTMLChakraProps<typeof Editable>["as"];
  Component: (props: { children: ReactNode }) => JSX.Element;
  defaultValue: string;
  keyToUpdate: keyof T;
  validationFunction: () => boolean;
  onUpdate: (props: T) => Promise<any>;
  input?: EditableInputProps;
  textarea?: EditableTextareaProps;
};

type EditableFieldType<T> = (props: EditableFieldProps<T>) => JSX.Element;

export const EditableField: EditableFieldType<
  Partial<Grave> & Partial<IUserProfile>
> = (props) => {
  const {
    as,
    Component,
    defaultValue,
    keyToUpdate,
    onUpdate,
    validationFunction,
    input,
    textarea,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const previousValue = useRef(defaultValue);
  const [newValue, setNewValue] = useState(defaultValue);

  const save = async () => {
    previousValue.current = newValue;
    const obj = { [keyToUpdate]: newValue };
    await onUpdate(obj);
    onClose();
  };

  const cancel = () => {
    setNewValue(previousValue.current);
    onClose();
  };

  return validationFunction() ? (
    <>
      <Alert
        title={"Сохранить"}
        cancelButton={{ title: "Нет", onClick: cancel }}
        confirmButton={{ title: "Да", colorScheme: "blue", onClick: save }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Text>Сохранить изменения?</Text>
      </Alert>
      <Editable
        as={as}
        value={newValue}
        onChange={setNewValue}
        onSubmit={onOpen}
      >
        <EditablePreview />
        {input && <EditableInput {...input} />}
        {textarea && <EditableTextarea {...textarea} />}
      </Editable>
    </>
  ) : (
    <Component>{defaultValue}</Component>
  );
};
