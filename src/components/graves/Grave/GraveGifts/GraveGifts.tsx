import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Textarea,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { TbCandy } from "react-icons/tb";
import { Gift, GiftTypes } from "../../../../types/Gift";
import { useGetGraveReturnType } from "../../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { useUpdateGrave } from "../../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";
import { CommonModal } from "../../../common/Modal/CommonModal/CommonModal";
import { GiftWithModal } from "../../../gifts/Gift/Gift";

export const GraveGifts = (props: useGetGraveReturnType) => {
  const { grave, refreshGrave } = props;
  const {
    isOpen: isGiftModalOpen,
    onOpen: onGiftModalOpen,
    onClose: onGiftModalClose,
  } = useDisclosure();

  const { updateGraveGifts } = useUpdateGrave();

  const [chosenGiftKey, setChosenGiftKey] = useState<GiftTypes | undefined>();
  const [message, setMessage] = useState<string>("");
  const [isModalLoading, setModalLoading] = useState(false);

  const chooseGift = (giftKey: GiftTypes) => {
    setChosenGiftKey(giftKey);
  };

  const presentGift = async () => {
    if (!grave) return console.error("No grave to update gifts on!");
    if (!chosenGiftKey) return console.error("No gift was chosen!");
    try {
      setModalLoading(true);
      grave.gifts = [
        ...grave.gifts,
        {
          by: "anonymous",
          wish: message,
          type: chosenGiftKey,
        },
      ];
      await updateGraveGifts(grave);
      await refreshGrave();
      onGiftModalClose();
    } finally {
      setModalLoading(false);
    }
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  if (!grave) return null;

  return (
    <>
      <CommonModal
        title="Подарок"
        isOpen={isGiftModalOpen}
        confirmButton={{
          onClick: presentGift,
        }}
        cancelButton={{
          onClick: onGiftModalClose,
        }}
        onClose={onGiftModalClose}
        isLoading={isModalLoading}
      >
        <Text mb={4}>
          Вы собираетесь оставить 1x {chosenGiftKey} на могилке у{" "}
          {grave.name + ".\n\r"}
          Желаете добавить что-нибудь к подарку?
        </Text>
        <Textarea
          resize="none"
          placeholder="Пожелайте что-нибудь покойнику, или пошлите его нахуй... Максимум 100 символов."
          maxLength={100}
          onChange={handleMessage}
          minHeight="150px"
        />
      </CommonModal>
      <VStack>
        <Box height="440px" width="100%" overflowY="auto" bg="gray.200">
          <Grid
            gap="10px"
            gridTemplateColumns="repeat(3, calc(33% - 10px))"
            gridAutoRows="100px"
            width="100%"
            height="100%"
            justifyContent="space-between"
            p={3}
          >
            {grave.gifts.map((gift: Gift) => {
              return (
                <GridItem
                  bg="white"
                  key={gift._id}
                  shadow="base"
                  as={Center}
                  css={{
                    svg: {
                      width: "60%",
                      height: "60%",
                    },
                  }}
                >
                  <GiftWithModal key={gift._id} {...gift} />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Flex
          justify={"space-around"}
          width="100%"
          my="1rem !important"
          css={{
            svg: {
              height: "40px",
              width: "40px",
            },
          }}
        >
          <IconButton
            icon={<FaMoneyBillWave />}
            onClick={() => chooseGift("money")}
            aria-label="Подарить денег"
            p={4}
          />
          <IconButton
            icon={<TbCandy />}
            onClick={() => chooseGift("candy")}
            aria-label="Подарить конфетов"
            p={4}
          />
          <IconButton
            icon={<MdLocalDrink />}
            onClick={() => chooseGift("vodka")}
            aria-label="Оставить чарку водки"
            p={4}
          />
        </Flex>
        <Button onClick={onGiftModalOpen} disabled={!!!chosenGiftKey}>
          Оставить
        </Button>
      </VStack>
    </>
  );
};
