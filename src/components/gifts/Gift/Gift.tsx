import { Gift } from "../../../types/Gift";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { TbCandy } from "react-icons/tb";
import { CommonModal } from "../../common/Modal/CommonModal/CommonModal";
import { Box, Center, useDisclosure } from "@chakra-ui/react";

export const GiftWithModal = (props: Gift) => {
  const { by, wish, type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const giftsSvgDictionary = {
    vodka: <MdLocalDrink />,
    money: <FaMoneyBillWave />,
    candy: <TbCandy />,
  };

  return (
    <>
      <Center onClick={onOpen}
      w="100%"
      h="100%"
      >{giftsSvgDictionary[type]}</Center>
      <CommonModal
        isOpen={isOpen}
        cancelButton={{ onClick: onClose, title: "Закрыть" }}
        onClose={onClose}
        title={"Подарок"}
      >
        Пользователь {by} оставил здесь 1x {type}
        {!wish ? "." : ` и написал: "${wish}"`}
      </CommonModal>
    </>
  );
};
