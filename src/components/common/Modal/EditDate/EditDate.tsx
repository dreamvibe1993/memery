import { useState } from "react";
import DatePicker from "react-date-picker";
import { BsFillCalendarDateFill } from "react-icons/bs";
import styled from "styled-components";
import { OnChangeDateCallback } from "react-calendar";
import { CommonModal } from "../CommonModal/CommonModal";
import { Box } from "@chakra-ui/react";

type EditDateProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (date: string) => void;
  dateDefault: string;
  ofWhat: string;
};

export const EditDate = (props: EditDateProps) => {
  const { isOpen, onCancel, onConfirm, dateDefault, ofWhat } = props;
  const [date, setDate] = useState(dateDefault);

  const changeDate: OnChangeDateCallback = (value) => {
    setDate(new Date(value).toISOString());
  };

  return (
    <CommonModal
      isOpen={isOpen}
      confirmButton={{
        onClick: () => onConfirm(date),
      }}
      cancelButton={{
        onClick: onCancel,
      }}
      onClose={onCancel}
      title={`Изменить дату ${ofWhat}`}
    >
      <Box pos="relative">
        <DatePickerStyled
          value={new Date(date)}
          format="dd/MM/yyyy"
          onChange={changeDate}
          calendarIcon={<BsFillCalendarDateFill />}
        />
      </Box>
    </CommonModal>
  );
};

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  min-width: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  transition-property: var(--chakra-transition-property-common);
  transition-duration: var(--chakra-transition-duration-normal);
  font-size: var(--chakra-fontSizes-md);
  -webkit-padding-start: var(--chakra-space-4);
  padding-inline-start: var(--chakra-space-4);
  -webkit-padding-end: var(--chakra-space-4);
  padding-inline-end: var(--chakra-space-4);
  height: var(--chakra-sizes-10);
  border-radius: var(--chakra-radii-md);
  border: 1px solid;
  border-color: inherit;
  background: inherit;
  & > * {
    border: none;
  }
  .react-date-picker__inputGroup {
    display: flex;
    align-items: center;
  }
  .react-date-picker__inputGroup__year {
    flex: 1;
  }
`;
